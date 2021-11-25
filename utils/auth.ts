import { JsonRpcSigner } from "@ethersproject/providers";

export async function signTransaction(signer: JsonRpcSigner, address: string) {
  const nonce = await getNonce(address);
  const sig = await signer.signMessage(`dao_accounting:${nonce || 0}`);
  await signInToBackend(address, sig, String(nonce));
}

export async function signInToBackend(
  account: string,
  sig: string,
  nonce: string
) {
  fetch("/api/signin", {
    method: "POST",
    body: JSON.stringify({
      account,
      sig,
      nonce,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function getNonce(address: string) {
  const res = await fetch(`/api/getNonce?address=${address}`);
  const data = await res.json();
  return data.nonce;
}
