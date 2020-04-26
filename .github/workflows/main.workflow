workflow "Build and deploy" {
  on = "push"
  resolves = ["Deploy"]
}

action "Install" {
  uses = "actions/npm@e7aaefe"
  args = "install"
}

action "Build" {
  uses = "actions/npm@e7aaefe"
  args = "run build"
  needs = ["Install"]
}

action "Deploy" {
  uses = "nchaulet/github-action-gh-pages@master"
  secrets = [
    "0d5f826cbc0de0d498821c96b5a7fc0c4a59507a",
  ]
  needs = ["Build"]
  env = {
    PUBLIC_PATH = "build"
  }
}
