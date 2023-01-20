export const OktaConfig = { /* Okta Configuration [Authentication purposes] */
    clientId:'0oa7vummwuBCLdYrH5d7',
    issuer:'https://dev-87554062.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes:['openid','profile','email'],
    pkce:true,
    disableHttpCheck:true,
}


