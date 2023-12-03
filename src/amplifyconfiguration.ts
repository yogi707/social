export const config = {
  Auth: {
    Cognito: {
      //  Amazon Cognito User Pool ID
      userPoolId: "us-east-2_dUzfr7wuV",
      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolClientId: "5qqm8n3fso3noko71c7skcp9f9",
      // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
      identityPoolId: "us-east-2:f8f24144-931f-42c1-b425-0d6161522316",

      // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
      // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
      signUpVerificationMethod: "code", // 'code' | 'link'
      loginWith: {
        // OPTIONAL - Hosted UI configuration
        oauth: {
          domain: "go.auth.us-east-2.amazoncognito.com",
          scopes: [
            "phone",
            "email",
            "profile",
            "openid",
            "aws.cognito.signin.user.admin",
          ],
          redirectSignIn: ["http://localhost:3000/"],
          redirectSignOut: ["http://localhost:3000/"],
          responseType: "code", // or 'token', note that REFRESH token will only be generated when the responseType is code
        },
      },
    },
  },
};
