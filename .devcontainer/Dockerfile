FROM ubuntu:20.04

ENV HOME=/workspace

RUN apt-get update && apt-get install -y sudo

# Unminimize Ubuntu to restore man pages
RUN yes | unminimize

# Install packages for projects
RUN sudo apt-get install -y curl git bash-completion man-db htop nano

# Install Node LTS
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
RUN sudo apt-get install -y nodejs

# Rust
RUN sudo apt-get install -y build-essential
RUN curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH="/workspace/.cargo/bin:${PATH}"

# Solana
RUN sh -c "$(curl -sSfL https://release.solana.com/v1.18.14/install)"
# RUN wget https://github.com/solana-labs/solana/releases/download/v1.16.9/solana-release-x86_64-unknown-linux-gnu.tar.bz2
# RUN tar jxf solana-release-x86_64-unknown-linux-gnu.tar.bz2
# RUN cd solana-release/
# ENV PATH="$PWD/bin:${PATH}"

RUN sudo apt-get update && sudo apt-get upgrade
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install pkg-config build-essential libudev-dev
RUN sudo apt install libssl-dev
RUN cargo install --git https://github.com/project-serum/anchor --tag v0.26.0 anchor-cli

RUN npm install --global yarn