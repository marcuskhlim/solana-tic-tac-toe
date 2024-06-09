import * as anchor from '@coral-xyz/anchor';
import {
  AnchorError,
  Program,
  AnchorProvider,
  setProvider,
  workspace
} from '@coral-xyz/anchor';
import { Mysolanaproject } from '../target/types/mysolanaproject';
import { expect } from 'chai';
import { Keypair, PublicKey, clusterApiUrl } from '@solana/web3.js';

describe('tic-tac-toe', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Mysolanaproject as Program<Mysolanaproject>;
  const programProvider = program.provider as AnchorProvider;

  it('initializes a game', async () => {
    const playerOne = Keypair.generate();
    const playerTwo = Keypair.generate();

    const [gamePublicKey, _] = PublicKey.findProgramAddressSync(
      [Buffer.from('game'), playerOne.publicKey.toBuffer()],
      program.programId
    );

    // Airdrop to playerOne
    const sg = await programProvider.connection.requestAirdrop(
      playerOne.publicKey,
      1_000_000_000
    );
    await programProvider.connection.confirmTransaction(sg);

    await program.methods
      .setupGame(playerTwo.publicKey)
      .accounts({
        game: gamePublicKey,
        playerOne: playerOne.publicKey
      })
      .signers([playerOne])
      .rpc();

    const gameData = await program.account.game.fetch(gamePublicKey);

    expect(gameData.turn).to.equal(1);
    expect(gameData.players).to.eql([playerOne.publicKey, playerTwo.publicKey]);

    expect(gameData.state).to.eql({ active: {} });
    expect(gameData.board).to.eql([
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]);
  });
});