# Exam 3 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

* NOTE: Because there is no coding portion to Exam 3, each of these questions is worth more to your grade than the questions on previous Exams!  Be sure to have answers you are confident shows your understanding!

## Q1: I have said that React JSX components are like functions and follow many of the same best practices.  Give at least 2 such best practices that are good for both JS functions and JSX Components.  (Be substantive!)

Answer:

1, Keep JS functions and JSX Components small and function-specific.
Keep component small, so that one component responsible to one function. Basically, a single component should render a specific bit of the page or modify a particular behavior. The same idea as JS functions.

2, Keep creation of new JS functions or JSX components to the minimum required, it can improve the reusability of
the functions and components.
Keep the minimum required, so we will not need to build a new component for a function if there already exists a component for that function. The same idea as JS functions.

3, Keep the JS functions and JSX components code as brief and concise as possible.

## Q2: I have said that using Progressive Enhancement (supporting both MPA and SPA) is best, but many places don't do so because of the effort involved.  What is at least one major reason not to use SPA alone?

Answer:

First drawback is that if you want to make a major architectural change, like, switch from one framework to another, it would be very hard to make incremental changes. For MPA, you could migrate the pages one by one and make progress step by step. But with a SPA, it's all or nothing. You will have to change the entire application in one go.

Second drawback is that it is easy to get into a situation when you are downloading all of the code needed for the entire web site on the initial page load, which can perform terribly for low-bandwidth connections.

## Q3: The "proxy" setting in your package.json is required for the create-react-app dev server to call a local service, but not if you are calling a service that will always be on a different domain.  Explain what happens (in terms of network traffic) when your dev server is running on localhost port 3000 and the page makes a call to `/service` when you have "proxy" set to `http://localhost:4000` and a server running on localhost port 4000 that has the `/service` service.  hint: This should list and describe multiple request/response steps, and be clear where the request is coming from and where the response is received.

Answer:

When the page running on dev server(`http://localhost:3000`), for example, make a service call to `/login` request, the browser and the JavaScript in the front end will make a call to `/login` to the dev server. The dev server does not make response to `/login`, but with "proxy" line in the `package.json`, dev server will send the request to service server(`http://localhost:4000`). Finally, the dev server gets the response from service server and then sends the response to the clients.   

## Q4: Follow-up: Using the above scenario, list and describe what the network calls are like after you run `npm run build` and are only running all of your content on localhost port 4000 when your JSX makes a call to `/service`

Answer:

After run `npm run build`, it will take the static files to transpire out of source and it will create a "build" directory. Then the static HTML and static js files will be in "build" directory. 

When the JSX makes a call to `/service`, the request will still send to dev server (`http://localhost:3000`), but we didn't run `npm start`, so the dev server is not running yet. So the browser will get error saying that it could not find the website. 

## Q5: I have said that you can only pass data "down" in React, not "up".  What does that mean?  Give simple code sample if that makes it easier to describe.

Answer:

It means only pass data from parent to child component.

Example: 

In `Parent.jsx` file

export default function Parent() {
    const state = {data: "Hello world"};
    return (
        <div>
            <Child dataFromParent={state}/>
        </div>
    );
};

In `Child.jsx` file

export default function Child({dataFromParent}) {
    return (
        <div>
            The data from parent is: {dataFromParent.data}
        </div>
    );
};

## Q6: Follow-up: If you can't pass data "up" the component tree, how can anything that is "down" change data?  Give simple code samples if that makes it easier to describe.

Answer:

Use callbacks change data.

Example:

In `Parent.jsx` file

export default function Parent() {
    const [message, setMessage] = useState(");
    const useCallBack = (childData) => {
        setMessage(childData);
    };

    return (
        <div>
            <Child useCallBack={useCallBack}/>
            <p>{message}</p>
        </div>
    );
};

In `Child.jsx` file

export default function Child({useCallBack}) {
    const sendData = () => {
        useCallBack("This is the data from child");
    }
    return (
        <div>
            <button onClick={sendData}>Send</button>
        </div>
    );
};

## Q7: Imagine you have a collection of student records, with each having a student id, a name, and an address. (an example of one item in the collection would be: { id: "654321", name: "Bao", address: "123 Main Street" })  Imagine you also have collection of steps to create a pizza, with each step having an ingredient, a quantity, and an instruction. (an example of one item in the collection would be the object { qty: "1 cup", ingredient: "shredded cheese", instructions: "sprinkle over pizza" })

Give a code sample where each collection is shown with at least one more element (2+ students for the first collection, 2+ pizza-making steps).  Make sure you make proper use of arrays and objects.  Explain why you've chosen each way of making a collection (e.g. Why you use an array for one or both, or why you use an object for one or both)

Answer: 

const students = {
    "654321" : {
        id: "654321",
        name: "Bao",
        address: "123 Main Street"
    },
    "654322" : {
        id: "654322",
        name: "Pose",
        address: "345 Main Street"
    }
};
Reason for using object: We do not care about the order of the students in the records, so we do not use array. 
Every student has detailed information and the info different from others, so, with object structure, using student id as a key and student info as the value, it is easy to target every student.

const steps = [
    {
        qty : "1 cup",
        ingredient: "shredded cheese",
        instructions: "sprinkle over pizza"
    },
    {
        qty: "100 ml",
        ingredient: "water",
        instructions: "Mix water with cheese"
    }
];
Reason for using array; Each step of create a pizza should in the right order, it may be become another different food when disorder the steps. Since array allows for ordered access, so using array for store create pizza steps.

## Q8: How does inheritance in JS relate to a prototype?  Give a simple code sample if it helps explain.

Answer: 

In JS, objects can have inheritance, which is an object can use the properties/methods of other object. If the code tries to access a value on the object, and the object does not have it defined for itself, it will check to see if it's prototype has it. Because the prototype is an object, when asked for this value,if it doesn't have it, it will check to see if it's prototype has it. This continues until an object doesn't have a prototype.

Example:

const student = {name: "bao"};
When `console.log(student.name)` we will get "bao", because `name` is in the object. 
When `console.log(student.age)` we will get undefined, because `age` isn't in the object and the prototype of the object doesn't have `age` either.
When `console.log(student.toString())` we will get [object, object], even though `toString()` isn't in the object, the prototype has `toString()` method.   

## Q9: What is wrong about this code sample? `if( !username || username == undefined) { ` be sure to explain why that is wrong.

Answer:

First of all, first situation includes second situation, so the second check is redundant.
Also, The strict equality operator (===) (as opposed to the standard equality operator(==)) should be used here, because username == undefined also checks whether username is null, while strict equality doesn't. This is because null is not equivalent to undefined.

## Q10: In your own words, what is decoupling?  What is an example of decoupling in a React app?  Why is this beneficial?

Answer: 

My understanding of decoupling in JS is separate big part of code into multiple small pieces. Makes each piece without having an effect on other one. For example in React app, put the functions into different components. In the react quiz app assignment, separate code into `Question.jsx`, `Answer.jsx`, `Quiz.jsx` and `App.jsx` files. This is good way to maintain and manipulate code, also it can reuse in the future if needed.      


