const core = require("@actions/core");
const github = require("@actions/github");

const token = core.getInput("token");
const octokit = github.getOctokit(token);

const visibility = "all";
const name = input("name", "");
const value = core.getInput("value");
const push_to_org = (input("org", "") !== "");
const owner = input("owner", github.context.payload.repository.owner.login);
const repository = input("repository", github.context.payload.repository.name);

function path_() {

  if (push_to_org) return "/orgs/" + owner;
  if (repository.includes("/")) return "/repos/" + repository;

  return "/repos/" + owner + "/" + repository;

}

function input(name, def) {

  let inp = core.getInput(name).trim();
  if (inp === "" || inp.toLowerCase() === "false") return def;

  return inp;

}

const createVariable = (data) => {

  if (push_to_org) return createOrgVariable(data);

  let url = "POST " + path_();
  url += "/actions/variables";

  return octokit.request(url, {
    name: name,
    value: data
  });
};

const createOrgVariable = (data) => {

  let url = "POST " + path_();
  url += "/actions/variables";

  return octokit.request(url, {
    name: name,
    visibility: visibility,
    value: data
  });
};

const setVariable = (data) => {

  let url = "PATCH " + path_();
  url += "/actions/variables/" + name;

  return octokit.request(url, {
    name: name,
    value: data
  });
};

const getVariable = (varname) => {

  let url = "GET " + path_();
  url += "/actions/variables/" + varname;

  return octokit.request(url);
};

const bootstrap = async () => {

  let exists = false;

  try {

    const response = await getVariable(name);
    exists = response.status === 200;

  } catch (e) {
    // Variable does not exist
  }

  try {

    if (name === "") {
      throw new Error("No name was specified!");
    }

    if (exists) {

      const response = await setVariable(value);

      if (response.status === 204) {
        return "Successfully updated variable " + name + " to '" + value + "'.";
      }

      throw new Error("ERROR: Wrong status was returned: " + response.status);

    } else {

      const response = await createVariable(value);

      if (response.status === 201) {
        return "Successfully created variable " + name + " with value '" + value + "'.";
      }

      throw new Error("ERROR: Wrong status was returned: " + response.status);

    }

  } catch (e) {
    core.setFailed(path_() + ": " + e.message);
    console.error(e);
  }
};

bootstrap()
  .then(
    (result) => {
      // eslint-disable-next-line no-console
      if (result != null) {
        console.log(result);
      }
    },
    (err) => {
      // eslint-disable-next-line no-console
      core.setFailed(err.message);
      console.error(err);
    },
  )
  .then(() => {
    process.exit();
  });
