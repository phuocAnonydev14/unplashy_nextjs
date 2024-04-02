export function checkExistEthereum() {
  if (!window.ethereum) {
    alert('No crypto wallet found. Please install it.');
    return;
  }
}
