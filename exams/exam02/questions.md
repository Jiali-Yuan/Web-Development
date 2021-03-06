# Exam 2 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q1: The first rule I've given about REST services is that the URL should represent a resource.  What does that mean?  Give an example where a url DOES not represent a resource, then describe how to modify it so that it does.
A: It means what the name `URL` Uniform Resource Locator means, it is an address of a given unique resource of the web, it is a place to send data. It is the same meaning as the URL represent a page. 
For example when the URL pointing to a resource has been moved, it does not represent a resource. Modifing the URL
path of the resource location changes to a valid URL.   

## Q2: If the service returns the username as a plain text string, what is wrong with the below and what would fix it? (Assume the service works without error)
```
  const username = fetch('/username');
  console.log(`user is named ${username}`);
```  
A: The `fetch()`method returns a `Promise`, so the username after console.log represents a promise. To fix it call the method `.json()`.
```
  fetch('/username')
  .then (response => response.json())
  .then(username => console.log(username));
```    

## Q3: What does it mean to "store your state in the DOM"?  Why shouldn't you do this?
A: DOM means Document Object Model. "store state in the DOM" means put and store data in the DOM.
We shouldn't do this because the DOM only exist on the browser-side, if there is no document/page, there will be no DOM. So shouldn't store state in the DOM. 

## Q4: Explain the differences between a multiple-page-web application and single-page-web application.  Be sure to fully demonstrate your understanding.
A: Multiple-page-web application:
   1, Reloads the entire page and displays the new one when the users interact with the web.
   2, Every change will be a new page requested from server side in the browser.

   Single-page-web applocation:
   1, Does not reload the entire page only load the contents on just one page.
   2, Execute the logic in the web browser rather than on the server. 

## Q5: What is Progressive Enhancement?  What is the difference in an SPA that uses Progressive Enhancement compared to an SPA that doesn't use Progressive Enhancement?
A: Progressive enhancement is a useful technique that allows web developers to focus on developing the best possible websites while making those websites work on multiple unknown user agents. SPA uses progressive enhancement povides a baseline of essential content and functionality to many users.


## Q6: Explain how a REST service is or is not similar to a dynamic asset.
A: A service based on REST is called REST service. The type returned by using REST service are XML or json format. By using REST service, we search for something and we get the result from the service we are request.And the dynamic assets is the things generated by send the request. Both have the process of send request for the server and get the  result.

## Q7: Give an example of a piece of information you should not store in a cookie, and why you should not store it that way.
A: Anything that should remain secure shouldn't be stored. For example, passwords, credit card numbers, social security numbers. Because cookies are stored on people's computers so they're basically out in the wild, potentially accessible to anyone. We should just store a session ID in a cookie, and store all other relevant information in a database (or file, or whatever) on the server, indexed by session ID.

## Q8: Explain why it is useful to separate a function that fetches data from what you do with that data
A: There are a lot of manipulations with data. Separate the function from data could reduce the amount of data transfered on each request. 

## Q9: Explain why try/catch is useless when dealing with asynchronous errors (assume you aren't using async/await)
A: Because try/catch already done before the callback function run.

## Q10: Is separation of concerns a front end issue, a server-side issue, or both?  Describe an example the demonstrates your answer.
A: Both fornt end issue and server-side issue. 
For example, in my exam2 spa code, I put server side code into `server.js` and `recipe-data.js`, put client side code into `recipe-web.js`, `recipe.js`, and `services.js`. With separation of concerns, each module or layer in an application should only be responsible for one thing and should not contain code that deals with other things. We only need to deal with the code of this sepcific feature, no worry about messed up other parts. Separating concerns reduces code complexity by breaking a large application down into many smaller units of encapsulated functionality.
