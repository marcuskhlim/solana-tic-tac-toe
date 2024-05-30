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
RUN sudo apt-get update && sudo apt-get upgrade
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install pkg-config build-essential libudev-dev
RUN sudo apt install clang -y
RUN sudo apt install libssl-dev
RUN sudo apt install -y protobuf-compiler

RUN git clone https://github.com/solana-labs/solana.git /solana

WORKDIR /solana

# Define an argument to control AVX2 disabling
ARG DISABLE_AVX2=false

# Conditionally set RUSTFLAGS and build the project
RUN if [ "$DISABLE_AVX2" = "true" ]; then \
      export RUSTFLAGS="-C target-cpu=native -C target-feature=-avx2" && \
      echo "Building without AVX2 support"; \
    else \
      echo "Building with AVX2 support"; \
    fi && \
    cargo build --release

# Add Solana binaries to PATH
ENV PATH="/solana/target/release:${PATH}"

WORKDIR /workspace

RUN cargo install --git https://github.com/project-serum/anchor --tag v0.26.0 anchor-cli

RUN npm install --global yarn