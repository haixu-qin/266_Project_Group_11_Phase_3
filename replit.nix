{ pkgs }: {
  deps = [
    pkgs.lsof
    pkgs.iproute2
    pkgs.unixtools.ping
    pkgs.xdg_utils
    pkgs.wget
    pkgs.sudo
    pkgs.systemdMinimal
    pkgs.unixtools.nettools
    pkgs.mongoose.bin
    pkgs.nodejs
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server  
  ];
}