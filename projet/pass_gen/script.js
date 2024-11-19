function generate_pass() {

  const span_pass = document.getElementById("password");
  const length = parseInt(document.getElementById("length_pass").value);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!:;,*ù$^=)àç_è-(é&";
  let password = "";

  if (isNaN(length) || length === 0) {
      alert("La longueur doit être un nombre supérieur à zéro.");
      return;
  }

  for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  span_pass.innerHTML = password;


      let b = baffle('.password'); 
      b.start();
      b.set({
        speed: 100,
        characters: '█<▓ ░█▒█▒ ░▒/░█ ▓▒▓ █/██▒ █▓█/ █▒█ ░█▒█ ▓░█▒'
    });
      b.text(() => password);
      b.reveal(1500); 


}
