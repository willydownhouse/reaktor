Reaktor coding challenge

Some Python projects use Poetry to manage dependencies. Poetry uses a file called poetry.lock to record which packages a project needs and which dependencies those packages have. Here is an example of such a file.

Write a small program in your language of choice that accepts a poetry.lock file as input and exposes some key information about the packages via an HTML user interface. The program should provide the following features:

The index page lists installed packages in alphabetical order with package names as links
When following each link, you arrive at information about a single package. The following information should be included:
Name
Description
The names of the packages the current package depends on (i.e. dependencies)
The names of the packages that depend on the current package (i.e. reverse dependencies)
The dependencies and reverse dependencies should be clickable and the user can navigate the package structure by clicking from package to package
Include all optional dependencies as well, but make clickable only those that are installed
Some things to keep in mind:

We appreciate solutions that have a clear structure and demonstrate your abilities to write clean code that has a good separation of concerns. Think about how other developers might take over the project after you’re done. Also think about how many 3rd party libraries you use. Pick just the amount that you think is suitable for the problem.
We also appreciate solutions that have a good UX. However, we don’t expect you to come up with a stunning visual appearance. We’re more interested in usability and performance
We would like to see you implement the parsing part of the assignment from scratch. poetry.lock is a TOML file, but please, do not use any ready-made 3rd party parsers in your solution. At the same time, it is enough to only parse what is needed for the assignment
Make the following simplifications:
Ignore package version numbers
Ignore the dev dependency flag, i.e. consider dev dependencies to be just regular dependencies
Focus only on the three following sections of the file: package, package.dependencies, package.extras
Optional dependencies can be found under packages.extras or under packages.dependencies with the flag optional set to true. Look into both places!
A good sample input file is the poetry.lock of Poetry itself. It can be found here.
poetry.lock has a versioned format. Make your solution work on version 1.1 which is the version of the sample file linked in this brief as can be checked in the metadata section of the file.
Practicalities:

Your solution must be hosted publicly, for example in Heroku. This will allow us to review it easily. Provide us with the link when submitting your solution
Upload the source code to GitHub or similar, preferably as a public repository. Provide us with the link when submitting your solution
Good luck and have fun!
