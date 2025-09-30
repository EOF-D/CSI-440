{
  description = "Champlain Academic Affairs project.";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    systems.url = "github:nix-systems/default";
    devenv.url = "github:cachix/devenv";
  };

  nixConfig = {
    extra-trusted-public-keys = "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw=";
    extra-substituters = "https://devenv.cachix.org";
  };

  outputs = {
    self,
    nixpkgs,
    devenv,
    systems,
    ...
  } @ inputs: let
    forEachSystem = nixpkgs.lib.genAttrs (import systems);
  in {
    packages = forEachSystem (system: {
      pkgs = nixpkgs.legacyPackages.${system};
      devenv-up = self.devShells.${system}.default.config.procfileScript;
    });

    devShells = forEachSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      dev = devenv.lib.mkShell {
        inherit inputs pkgs;
        modules = [
          {
            packages = with pkgs; [
              nodejs_22
              pnpm
              prisma-engines
              openssl
            ];

            env = {
              PRISMA_QUERY_ENGINE_LIBRARY = "${pkgs.prisma-engines}/lib/libquery_engine.node";
              PRISMA_QUERY_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/query-engine";
              PRISMA_SCHEMA_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/schema-engine";
            };

            enterShell = ''
              echo "CAA Project Development Environment"
              echo ""
              echo "  pnpm install    # Install dependencies"
              echo "  pnpm dev        # Start development servers"
              echo "  pnpm build      # Build all packages"
              echo ""
            '';

            languages = {
              typescript.enable = true;
              javascript = {
                enable = true;
                npm.enable = false;
                pnpm.enable = true;
              };
            };
          }
        ];
      };
    });
  };
}

