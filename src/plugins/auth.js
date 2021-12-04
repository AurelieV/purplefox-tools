import { ref, readonly, watch, reactive, inject, toRef } from "vue";
class Authentication {
    constructor({ supabase, roleContextKeyName, devRedirectTo }) {
        this.supabase = supabase;
        this.roleContextKeyName = roleContextKeyName;
        this.devRedirectTo = devRedirectTo;
        this._user = ref(undefined);
        this._roles = ref(undefined);
    }

    async getUserProfile(id) {
        const { data, error } = await this.supabase.from("profiles").select().match({ id });
        if (error) return null;
        if (data.length === 0) return null;
        return data[0];
    }

    async synchroUserWithSupabase(session) {
        if (session) {
            const id = session.user.id;
            const { firstname, lastname } = (await this.getUserProfile(id)) || {};
            this._user.value = {
                id,
                avatar: session.user.user_metadata.avatar_url,
                firstname,
                lastname,
            };
        } else {
            this._user.value = null;
        }
        this._roles.value = undefined;
        await this.synchronizeRoles();
    }

    async synchronizeRoles(tournamentId) {
        if (!this._user.value) {
            this._roles.value = [];
            return;
        }
        let data, error;
        if (tournamentId) {
            ({ data, error } = await this.supabase
                .from("roles")
                .select()
                .match({ user_id: this._user.value.id })
                .or(`${this.roleContextKeyName}.eq.${tournamentId},${this.roleContextKeyName}.is.null`));
        } else {
            ({ data, error } = await this.supabase
                .from("roles")
                .select()
                .match({ user_id: this._user.value.id })
                .is(`${this.roleContextKeyName}`, null));
        }
        if (error) {
            this._roles.value = [];
        } else {
            this._roles.value = data.map(({ name }) => name);
        }
    }

    async synchronizeProfile() {
        return await this.synchroUserWithSupabase(this.supabase.auth.session());
    }

    async login() {
        if (this.devRedirectTo) {
            await this.supabase.auth.signIn({ provider: "discord" }, { redirectTo: this.devRedirectTo });
        } else {
            await this.supabase.auth.signIn({ provider: "discord" });
        }
    }
    async logout() {
        await this.supabase.auth.signOut();
    }

    async setProfile(profile) {
        if (!this._user.value) return;
        const { error } = await this.supabase.from("profiles").update(profile).match({ id: this._user.value.id });
        if (error) return Promise.reject(error);
        await this.synchronizeProfile();
    }

    async getIsAuthenticated() {
        if (this._user.value !== undefined) {
            return Promise.resolve(!!this._user.value);
        }
        return new Promise((resolve) => {
            const unwatch = watch(this._user, (user) => {
                if (user !== undefined) {
                    resolve(user !== null);
                    unwatch();
                }
            });
        });
    }

    async getHasRoles(rolesToHave) {
        if (this._roles.value !== undefined) {
            return Promise.resolve(rolesToHave.some((role) => this._roles.value.includes(role)));
        }
        return new Promise((resolve) => {
            const unwatch = watch(this._roles, (roles) => {
                if (roles !== undefined) {
                    resolve(rolesToHave.some((role) => this._roles.value.includes(role)));
                    unwatch();
                }
            });
        });
    }
}

const AUTH_TOKEN = Symbol("Authentification");

export default function install(
    app,
    { supabase, router, loginRouteName = "login", defaultRouteName = "home", roleContextKeyName, devRedirectTo } = {}
) {
    const authententication = new Authentication({ supabase, roleContextKeyName, devRedirectTo });
    const user = readonly(authententication._user);
    const roles = readonly(authententication._roles);
    authententication.synchroUserWithSupabase(supabase.auth.session());
    supabase.auth.onAuthStateChange((event, session) => {
        authententication.synchroUserWithSupabase(session);
    });
    const auth = reactive({
        user,
        roles,
        login: authententication.login.bind(authententication),
        logout: authententication.login.bind(authententication),
        setProfile: authententication.setProfile.bind(authententication),
        synchronizeRoles: authententication.synchronizeRoles.bind(authententication),
    });
    app.config.globalProperties.$auth = auth;
    router.beforeEach(async (to) => {
        if (to.meta.auth || to.meta.roles) {
            const isAuthent = await authententication.getIsAuthenticated();
            if (!isAuthent) {
                return {
                    name: loginRouteName,
                    query: { redirect_uri: to.fullPath },
                };
            }
            if (to.meta.roles) {
                const hasRoles = await authententication.getHasRoles(to.meta.roles);
                if (!hasRoles) {
                    return {
                        name: defaultRouteName,
                    };
                }
            }
        }
    });
    app.provide(AUTH_TOKEN, auth);
}

export function useAuth() {
    const auth = inject(AUTH_TOKEN, {});
    const user = toRef(auth, "user");
    const roles = toRef(auth, "roles");
    return { user, roles, synchronizeRoles: auth.synchronizeRoles, setProfile: auth.synchronizeProfile };
}
