# plateng
Platform Engineering

TODO:
- Identity Managemetn (Keycloak)


curl --request GET \
--url "https://api.github.com/octocat" \
--header "Authorization: Bearer $GITHUB_TOKEN" \
--header "X-GitHub-Api-Version: 2022-11-28"


curl -H "Authorization: bearer $GITHUB_TOKEN" -X POST -d " \
 { \
   \"query\": \"query { viewer { login }}\" \
 } \
" https://api.github.com/graphql