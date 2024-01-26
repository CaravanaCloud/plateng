let _command = 'sponsors-extract';
let _description = "Extract sponsors from github to files";

function getEnv(envName){
    let env = process.env[envName];
    if(env == undefined){
        console.log("Environment variable "+envName+" not defined.");
        process.exit(1);
    }
    return env;
}

const { graphql } = require("@octokit/graphql");
const githubToken = getEnv("GITHUB_TOKEN");
const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: `token ${githubToken}`
    }
  });

  async function checkAccess() {
    const query = `
      query {
        viewer {
          login
          name
        }
      }
    `;
  
    try {
      const response = await graphqlWithAuth(query);
      console.log('Authenticated as:', response.viewer);
    } catch (error) {
      console.error("Error:", error);
    }
  }

async function getSponsors() {
  // https://docs.github.com/en/graphql/guides/using-pagination-in-the-graphql-api
    const query = `
    query($org_name: String!, $first: Int=100) {
      organization(login: $org_name) {
        sponsors(first: $first) {
          edges {
            node {
              ... on User {
                login
                name
                email
              }
              ... on Organization {
                login
                name
                email
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await graphqlWithAuth(query, {
      org_name: "caravanacloud"
    });
    const sponsors = response.organization
      .sponsors
      .edges
      .map( node => node["node"]);

    const result = sponsors;
    // console.log(JSON.stringify(sponsors, null, 2));
    return result;
  } catch (error) {
    console.error("Error fetching sponsors:", error);
  }
}

let _action = () => {
    console.log("Extracting sponsors from github to files. ");
    checkAccess().then( 
      _ => getSponsors().then( 
        xs => xs.forEach( x => console.log(x)))
    ).then( _ => console.log("done."));
}

module.exports = (program) => {
    program.command(_command)
        .description(_description)
        .action(_action);
}