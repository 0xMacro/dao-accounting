declare module "iron-session" {
  interface IronSessionData {
    connectedAddress?: string;
  }
}

export const sessionConfig = {
  cookieName: "dao_accounting_app_session",
  password: process.env.SESSION_PASSWORD,
  ttl: 86400,
};
