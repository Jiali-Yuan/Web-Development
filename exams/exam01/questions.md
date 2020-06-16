# Exam 1 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q: What is the difference between a dynamic asset and a static asset?
  
   A: The difference between dynamic asset and static asset is dynamic assets are not the exist files but the things generated in response to the request which include server's change. However, static assets are the objects sent to users but the servers don't change. Such as HTML, CSS, images. Static
   assets are just the files store on the server and then send to the user.

## Q: What is the difference between a relative and absolute file path in an href?  What is the "webserver root/document root" and how do absolute/relative paths relate to this document root?

   A: Ralative path is the path related to the present working directory. However, absolute path is points to the same location in a file system. 
      The document root is the folder that stored on the host's servers and that is designated for holding web pages. When someone looks at the website, this is the location they will be accessing.
      Absolute path is taken from the document root of the server.

## Q: What is the difference between server-side and client-side JS?

   A: The differentce between server-side and client-side JS is the server-side executed in the server end which users can not see. However, the client-side executed the code in the client which is visible to users.

## Q: What are the differences between `var`, `const`, and `let`, and when should you use each of them?

   A: The differences between `var`, `const`, and `let` are in following points.
      1, `var` can be acessable anywhere in function, however, `let` and `const` only block assceeable.
      2, `var` and `let` can change there value, however, `const` can not.
      3, `var` is "hoists", which meaning a declarating, but not an initialiation. However, `let` and `const` do not "hoist". 
      We should never use `var` unless we have to. Ues `let` and `const`, but use `const` as much as possible. 

## Q: What are the 4 ways to create inheritance in JS? (no examples needed, just a sentence describing each)

   A: 1. Construction function. Keyword `new` used in function call, the prototype property is 
         assigned as the prototype of the new object.
      2. Object.create. `Use Object.create()` create a new object, with the new object's prototype 
         set to passed object. 
      3. ES6 classes. ECMAScript2015. Use keyword `class`.
      4. Brute Force Prototype Assignment. Objects created with syntax constructs and can set 
         the prototype directly, 

## Q: Give a short code demonstration of 1 way to create JS inheritance to __inherit__ a method named "purr".

   A: Construction function
      
      const Cat = function(name) {
         this.name = name;
      };
      Cat.prototype.purr = function() {
         console.log(`${this.name} is greeting`);
      };
      const kitty = new Cat('kitty');
      kitty.purr();

## Q: Give a short code demonstration of a different way to create JS inheritance to __inherit__ a method named "hiss".

   A: Object.create()

      const cat = {
         hiss: function() {
            console.log(`${this.name} is greeting`);
         }
      };
      const kitty = Object.create(cat);
      kitty.name = 'kitty';
      kitty.hiss();

## Q: Explain what a callback is, and give an example.

   A: A callback is a function passed to another function as an argument, which is then invoked 
      inside the outer function to complete some kind of routine or action.

      Example: 

      const greeting = function(callback) {
         console.log("Class INFO6250");
         callback();
      };

      const hello = function() {
         console.log("Hello");
      };

      greeting(hello);

## Q: What are the words that would correctly fill in the space in this sentence:

"If a function using `this` is used `as a callback`, then `this` will not have the expected implicit value"

## Q: In CSS, what does it mean "You shouldn't name your classes after what they look like"?   Why?  Give an example of a class that is well named and a class that is poorly named.

   A: It means do not name class for it intended effect, but name it for what they identify. 
      Because it will make the code easier to read and maintain.
      For example, when we name a checkbox which arranged in the left of the HTML page, the well named class is `selected`, the poorly named class is `left`. As in the future, when rearrange the checkbox to the page right, we know what it is and we do not need to rename the class.

