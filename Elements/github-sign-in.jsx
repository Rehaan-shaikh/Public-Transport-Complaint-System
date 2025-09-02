"use client";

import { Button } from "@/components/ui/button";
import { Github } from "../components/ui/github";
import { githubSignIn } from "@/Actions/GitGoogle";

const GithubSignIn = () => {
  return (
    <Button
      className="w-full flex items-center justify-center"
      variant="outline"
      type="button"
      onClick={() => githubSignIn()} // call action on click
    >
      <Github className="mr-2 h-5 w-5" />
      GitHub
    </Button>
  );
};

export { GithubSignIn };
