document.addEventListener("DOMContentLoaded", () => {
    // 🪲 Bug: Incorrect ID used for attaching the event listener
    document.getElementById("solveRoom1").addEventListener("click", () => {
        fetch('books.json')
            .then(response => response.json())
            .then(books => {
                const mostRecentBook = findMostRecentBook(books);
                // 🪲 Bug: Incorrect element ID
                // Fix: Corrected the element ID to match the expected HTML element ID
                document.getElementById("room1Result").textContent = `The key to the next room is: ${mostRecentBook.title}`;
            })
            .catch(error => {
                console.error('Error fetching the books:', error);
                document.getElementById("room1Result").textContent = 'Failed to load the books data.';
            });
    });

    document.getElementById("solveRoom2").addEventListener("click", () => {
        const jsConcepts = new Set(['closure', 'scope', 'hoisting']);
        // 🪲 Bug: Missing 'async' and 'promises' concepts from JavaScript concepts
        jsConcepts.add('async');
        jsConcepts.add('promises');
        
        const reactConcepts = new Set(['components', 'jsx', 'hooks', 'async']);
        // 🪲 Bug: Incorrect function call, findIntersection should use `jsConcepts` and `reactConcepts`
        const commonConcepts = findIntersection(jsConcepts, reactConcepts);
        document.getElementById("room2Result").textContent = `The code to unlock the door is: ${Array.from(commonConcepts).join(', ')}`;
    });

    document.getElementById("solveRoom3").addEventListener("click", () => {
        fetch('directions.json')
            .then(response => response.json())
            .then(directions => {
                navigateLabyrinth(directions)
                    .then(message => {
                        // 🪲 Bug: Changed method from `innerHTML` to `textContent`
                        document.getElementById("room3Result").textContent = message;
                    })
                    .catch(error => {
                        console.error('Error in navigateLabyrinth:', error);
                        document.getElementById("room3Result").textContent = 'Failed to navigate the labyrinth.';
                    });
            })
            .catch(error => {
                console.error('Error fetching the directions:', error);
                document.getElementById("room3Result").textContent = 'Failed to load the directions data.';
            });
    });
});

function findMostRecentBook(books) {
    // 🪲 Bug: Logic error corrected, compare for newer date
    return books.reduce((mostRecent, book) => new Date(book.published) > new Date(mostRecent.published) ? book : mostRecent);
}

function findIntersection(setA, setB) {
    // 🪲 Bug: Find the intersection between setA and setB
    const intersection = new Set();
    for (const item of setA) {
        if (setB.has(item)) {
            intersection.add(item);
        }
    }
    return intersection;
}

async function navigateLabyrinth(directions) {
    for (let direction of directions) {
        // 🪲 Bug: Fixed the delay by awaiting the promise
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`Navigating: ${direction.step}`);
    }
    return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
}
