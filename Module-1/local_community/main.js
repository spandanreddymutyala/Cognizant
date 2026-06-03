/* =============================================================
   main.js — Local Community Event Portal
   Covers JavaScript Exercises 1–14
   ============================================================= */


/* ============================================================
   EXERCISE 1 — JavaScript Basics & Setup
   ============================================================ */

// Log welcome message to the console
console.log("Welcome to the Community Portal");

// Alert when the page is fully loaded
window.addEventListener("load", function () {
  alert("Page fully loaded! Welcome to the Community Event Portal.");
});


/* ============================================================
   EXERCISE 2 — Syntax, Data Types, and Operators
   ============================================================ */

// const for fixed values, let for mutable seat count
const eventName = "Summer Music Fest";
const eventDate = "15 June 2025";
let availableSeats = 120;

// Template literal concatenation
const eventInfo = `Event: ${eventName} | Date: ${eventDate} | Seats Available: ${availableSeats}`;
console.log(eventInfo);

// Increment / decrement seat count on registration / cancellation
function registerSeat() {
  availableSeats--;
  console.log(`Seat registered. Remaining seats: ${availableSeats}`);
}

function cancelSeat() {
  availableSeats++;
  console.log(`Registration cancelled. Remaining seats: ${availableSeats}`);
}


/* ============================================================
   EXERCISE 3 — Conditionals, Loops, and Error Handling
   ============================================================ */

// Sample event list used throughout the file
const events = [
  { id: 1, name: "Summer Music Fest",   date: "2025-06-15", venue: "City Park",       seats: 120, category: "music"   },
  { id: 2, name: "Food & Culture Fair",  date: "2025-06-22", venue: "Town Hall",       seats: 80,  category: "food"    },
  { id: 3, name: "Marathon 2025",        date: "2025-07-05", venue: "Main Boulevard",  seats: 200, category: "sports"  },
  { id: 4, name: "Art Exhibition",       date: "2025-07-10", venue: "Museum",          seats: 0,   category: "art"     },
  { id: 5, name: "Yoga in the Park",     date: "2025-07-20", venue: "City Park",       seats: 50,  category: "wellness"},
  { id: 6, name: "Workshop on Baking",   date: "2025-08-01", venue: "Community Hall",  seats: 30,  category: "food"    },
  { id: 7, name: "Photography Walk",     date: "2024-01-10", venue: "Old Town",        seats: 20,  category: "art"     }, // past event
];

// Check if an event is upcoming and has seats
function isEventValid(event) {
  const today = new Date();
  const eventDateObj = new Date(event.date);

  if (eventDateObj < today) {
    console.log(`"${event.name}" is a past event — hidden.`);
    return false;
  }
  if (event.seats === 0) {
    console.log(`"${event.name}" is fully booked — hidden.`);
    return false;
  }
  return true;
}

// Loop through events with forEach and display valid ones
console.log("\n--- Valid Upcoming Events ---");
events.forEach(function (event) {
  if (isEventValid(event)) {
    console.log(`✔ ${event.name} | ${event.date} | Seats: ${event.seats}`);
  }
});

// Registration wrapped in try-catch to handle errors gracefully
function registerUser(userName, event) {
  try {
    if (!userName || typeof userName !== "string") {
      throw new Error("Invalid user name provided.");
    }
    if (!event || typeof event !== "object") {
      throw new Error("Invalid event object.");
    }
    if (event.seats <= 0) {
      throw new Error(`Sorry, "${event.name}" is fully booked.`);
    }
    event.seats--;
    console.log(`✅ ${userName} successfully registered for "${event.name}". Seats left: ${event.seats}`);
  } catch (error) {
    console.error(`Registration error: ${error.message}`);
  }
}

// Test registration
registerUser("Alice", events[0]);
registerUser("", events[0]);          // triggers name error
registerUser("Bob", events[3]);       // triggers full-event error


/* ============================================================
   EXERCISE 4 — Functions, Scope, Closures, Higher-Order Functions
   ============================================================ */

// Add a new event to the list
function addEvent(name, date, venue, seats, category) {
  const newEvent = { id: events.length + 1, name, date, venue, seats, category };
  events.push(newEvent);
  console.log(`Event added: ${name}`);
  return newEvent;
}

// Register a user (enhanced with callback support)
function registerUserToEvent(userName, eventId, onSuccess, onError) {
  const event = events.find(e => e.id === eventId);
  try {
    if (!event) throw new Error(`Event with id ${eventId} not found.`);
    if (event.seats <= 0) throw new Error(`"${event.name}" is fully booked.`);
    event.seats--;
    if (typeof onSuccess === "function") onSuccess(userName, event);
  } catch (err) {
    if (typeof onError === "function") onError(err.message);
  }
}

// Filter events by category (accepts a callback for dynamic conditions)
function filterEventsByCategory(category, callback) {
  return events.filter(event => {
    const matchesCategory = event.category === category;
    return callback ? callback(event) && matchesCategory : matchesCategory;
  });
}

// Closure — tracks total registrations per category
function createCategoryTracker(category) {
  let totalRegistrations = 0;                     // private via closure
  return {
    register() {
      totalRegistrations++;
      console.log(`[${category}] Total registrations: ${totalRegistrations}`);
    },
    getTotal() {
      return totalRegistrations;
    }
  };
}

const musicTracker  = createCategoryTracker("music");
const sportsTracker = createCategoryTracker("sports");

registerUserToEvent(
  "Carol",
  1,
  (name, ev) => { console.log(`${name} joined ${ev.name}`); musicTracker.register(); },
  (msg)      => { console.error(msg); }
);

// Dynamic search using a callback passed to filter
const upcomingMusicEvents = filterEventsByCategory("music", event => event.seats > 0);
console.log("Upcoming music events:", upcomingMusicEvents.map(e => e.name));


/* ============================================================
   EXERCISE 5 — Objects and Prototypes
   ============================================================ */

// Event constructor function
function Event(id, name, date, venue, seats, category) {
  this.id       = id;
  this.name     = name;
  this.date     = new Date(date);
  this.venue    = venue;
  this.seats    = seats;
  this.category = category;
}

// Add checkAvailability to prototype (shared by all instances)
Event.prototype.checkAvailability = function () {
  const today = new Date();
  if (this.date < today) return `"${this.name}" has already passed.`;
  if (this.seats === 0)  return `"${this.name}" is fully booked.`;
  return `"${this.name}" is available with ${this.seats} seat(s) remaining.`;
};

// List all properties using Object.entries()
Event.prototype.listDetails = function () {
  console.log(`\nDetails for: ${this.name}`);
  Object.entries(this).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
  });
};

const sampleEvent = new Event(10, "City Book Fair", "2025-09-10", "Public Library", 60, "education");
console.log(sampleEvent.checkAvailability());
sampleEvent.listDetails();


/* ============================================================
   EXERCISE 6 — Arrays and Methods
   ============================================================ */

// Add a new event using .push()
events.push({
  id: events.length + 1,
  name: "Street Dance Battle",
  date: "2025-08-15",
  venue: "City Square",
  seats: 100,
  category: "music"
});
console.log("Events after push:", events.length);

// Filter only music events
const musicEvents = events.filter(event => event.category === "music");
console.log("Music events:", musicEvents.map(e => e.name));

// Map to formatted display cards
const formattedCards = events.map(event => `${event.category.charAt(0).toUpperCase() + event.category.slice(1)}: ${event.name}`);
console.log("Formatted event cards:", formattedCards);


/* ============================================================
   EXERCISE 7 — DOM Manipulation
   ============================================================ */

// Render all valid events into the DOM
function renderEvents(eventList) {
  const container = document.querySelector("#events");
  if (!container) return;

  // Remove any previously JS-rendered cards to avoid duplicates
  container.querySelectorAll(".js-event-card").forEach(card => card.remove());

  eventList.forEach(event => {
    if (!isEventValid(event)) return;

    const card = document.createElement("div");
    card.className = "eventCard js-event-card";
    card.setAttribute("data-id", event.id);

    card.innerHTML = `
      <h3>${event.name}</h3>
      <p>Date: ${event.date} | Venue: ${event.venue}</p>
      <p class="seats-count">Seats left: <strong>${event.seats}</strong></p>
      <button class="cta-button register-btn" data-id="${event.id}">Register Now</button>
      <button class="cta-button cancel-btn" data-id="${event.id}" style="margin-left:8px; background:#888;">Cancel</button>
    `;

    container.appendChild(card);
  });
}

// Update seat count in the UI after registration or cancellation
function updateEventCard(eventId) {
  const event = events.find(e => e.id === eventId);
  const card  = document.querySelector(`.js-event-card[data-id="${eventId}"]`);
  if (!card || !event) return;

  const seatsEl = card.querySelector(".seats-count strong");
  if (seatsEl) seatsEl.textContent = event.seats;

  if (event.seats <= 0) {
    card.querySelector(".register-btn").disabled = true;
    card.querySelector(".register-btn").textContent = "Full";
  }
}

// Run render once DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  renderEvents(events);
});


/* ============================================================
   EXERCISE 8 — Event Handling
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

  // --- onclick: Register / Cancel buttons (event delegation) ---
  document.querySelector("#events").addEventListener("click", function (e) {
    const btn = e.target;

    // Register button
    if (btn.classList.contains("register-btn")) {
      const id   = parseInt(btn.getAttribute("data-id"), 10);
      const name = prompt("Enter your name to register:") || "Guest";
      registerUser(name, events.find(ev => ev.id === id));
      updateEventCard(id);
    }

    // Cancel button
    if (btn.classList.contains("cancel-btn")) {
      const id    = parseInt(btn.getAttribute("data-id"), 10);
      const event = events.find(ev => ev.id === id);
      if (event) {
        event.seats++;
        updateEventCard(id);
        console.log(`Cancellation processed for "${event.name}". Seats now: ${event.seats}`);
      }
    }
  });

  // --- onchange: Filter events by category dropdown ---
  const categoryFilter = document.createElement("select");
  categoryFilter.id = "categoryFilter";
  categoryFilter.innerHTML = `
    <option value="all">All Categories</option>
    <option value="music">Music</option>
    <option value="food">Food</option>
    <option value="sports">Sports</option>
    <option value="art">Art</option>
    <option value="wellness">Wellness</option>
  `;
  categoryFilter.style.cssText = "margin: 12px 0; padding: 8px; font-size: 1rem;";

  const eventsSection = document.querySelector("#events");
  if (eventsSection) {
    eventsSection.insertBefore(categoryFilter, eventsSection.querySelector(".eventCard") || eventsSection.querySelector("h2").nextSibling);
  }

  categoryFilter.onchange = function () {
    const selected = this.value;
    const filtered = selected === "all" ? events : events.filter(e => e.category === selected);
    renderEvents(filtered);
  };

  // --- keydown: Quick search by event name ---
  const searchInput = document.createElement("input");
  searchInput.type        = "text";
  searchInput.placeholder = "🔍 Quick search events…";
  searchInput.id          = "quickSearch";
  searchInput.style.cssText = "margin: 8px 0; padding: 8px; font-size: 1rem; width: 260px;";

  if (eventsSection) {
    eventsSection.insertBefore(searchInput, categoryFilter);
  }

  searchInput.addEventListener("keydown", function (e) {
    const query    = e.target.value.toLowerCase();
    const filtered = events.filter(ev => ev.name.toLowerCase().includes(query));
    renderEvents(filtered);
  });

});


/* ============================================================
   EXERCISE 9 — Async JS, Promises, Async/Await
   ============================================================ */

// Mock API endpoint (JSONPlaceholder used as a stand-in)
const MOCK_API = "https://jsonplaceholder.typicode.com/posts?_limit=3";

// --- Using .then() / .catch() ---
function fetchEventsWithPromise() {
  console.log("Fetching events (Promise style)…");
  fetch(MOCK_API)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log("Events fetched (Promise):", data.length, "records");
    })
    .catch(error => {
      console.error("Fetch error (Promise):", error.message);
    });
}

// --- Rewritten with async/await and a loading spinner ---
async function fetchEventsAsync() {
  const spinner = document.getElementById("loadingSpinner");
  if (spinner) spinner.style.display = "block";

  try {
    const response = await fetch(MOCK_API);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    console.log("Events fetched (async/await):", data.length, "records");
  } catch (error) {
    console.error("Fetch error (async/await):", error.message);
  } finally {
    if (spinner) spinner.style.display = "none";
  }
}

// Inject a simple spinner element and run both fetch demos
document.addEventListener("DOMContentLoaded", function () {
  const spinner = document.createElement("p");
  spinner.id           = "loadingSpinner";
  spinner.textContent  = "⏳ Loading events…";
  spinner.style.cssText = "display:none; font-style:italic; color:#666;";
  document.querySelector("#events")?.prepend(spinner);

  fetchEventsWithPromise();
  fetchEventsAsync();
});


/* ============================================================
   EXERCISE 10 — Modern JavaScript Features (ES6+)
   ============================================================ */

// Default parameters
function createEventCard(name, category = "general", seats = 50) {
  return { name, category, seats };
}
console.log(createEventCard("Tech Meetup"));               // uses defaults
console.log(createEventCard("Jazz Night", "music", 80));

// Destructuring to extract event details
const [firstEvent, secondEvent] = events;
const { name: firstName, date: firstDate, venue: firstVenue } = firstEvent;
console.log(`First event: ${firstName} on ${firstDate} at ${firstVenue}`);

// Spread operator to clone the list before filtering (original untouched)
const eventsClone = [...events];
const filteredClone = eventsClone.filter(e => e.seats > 50);
console.log("Filtered clone count:", filteredClone.length, "| Original count:", events.length);


/* ============================================================
   EXERCISE 11 — Working with Forms
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form") || document.querySelector("#register");

  // Capture form values via form.elements when the register button is clicked
  const submitBtn = document.getElementById("registerBtn") || document.querySelector(".cta-button[onclick='submitForm()']");

  if (submitBtn) {
    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();                     // prevent default page reload / form submit

      const nameInput  = document.getElementById("fullName");
      const emailInput = document.getElementById("email");
      const eventSel   = document.getElementById("eventType");
      const output     = document.getElementById("formOutput");

      // Clear previous inline errors
      [nameInput, emailInput, eventSel].forEach(el => { if (el) el.style.outline = ""; });
      if (output) output.textContent = "";

      let hasError = false;

      // Validate name
      if (!nameInput || !nameInput.value.trim()) {
        if (nameInput) nameInput.style.outline = "2px solid red";
        showInlineError(nameInput, "Name is required.");
        hasError = true;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
        if (emailInput) emailInput.style.outline = "2px solid red";
        showInlineError(emailInput, "Enter a valid email address.");
        hasError = true;
      }

      // Validate event selection
      if (!eventSel || !eventSel.value) {
        if (eventSel) eventSel.style.outline = "2px solid red";
        showInlineError(eventSel, "Please select an event.");
        hasError = true;
      }

      if (!hasError) {
        const userName  = nameInput.value.trim();
        const userEmail = emailInput.value.trim();
        const eventVal  = eventSel.options[eventSel.selectedIndex].text;
        if (output) {
          output.textContent = `✅ Thank you, ${userName}! You're registered for "${eventVal}". A confirmation will be sent to ${userEmail}.`;
          output.style.color = "green";
        }
        console.log("Form submitted:", { userName, userEmail, eventVal });
      }
    });
  }

  // Helper — show inline error message below a field
  function showInlineError(field, message) {
    if (!field) return;
    let errEl = field.parentNode.querySelector(".field-error");
    if (!errEl) {
      errEl = document.createElement("small");
      errEl.className  = "field-error";
      errEl.style.color = "crimson";
      field.parentNode.appendChild(errEl);
    }
    errEl.textContent = message;
  }
});


/* ============================================================
   EXERCISE 12 — AJAX & Fetch API
   ============================================================ */

const MOCK_POST_API = "https://jsonplaceholder.typicode.com/posts";

// POST user registration data to a mock API
async function submitRegistration(userData) {
  const output = document.getElementById("formOutput");

  // Simulate a delayed response with setTimeout
  await new Promise(resolve => setTimeout(resolve, 1500));

  try {
    const response = await fetch(MOCK_POST_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });

    if (!response.ok) throw new Error(`Server error: ${response.status}`);

    const result = await response.json();
    console.log("Registration submitted successfully:", result);

    if (output) {
      output.textContent = `✅ Registration confirmed! (ID: ${result.id}) — confirmation sent.`;
      output.style.color = "green";
    }
  } catch (error) {
    console.error("Submission failed:", error.message);
    if (output) {
      output.textContent = `❌ Submission failed: ${error.message}. Please try again.`;
      output.style.color = "crimson";
    }
  }
}

// Expose for use in the form submit handler
window.submitRegistration = submitRegistration;


/* ============================================================
   EXERCISE 13 — Debugging and Testing
   ============================================================ */

// Step-by-step logging to trace form submission and fetch payload
function debugRegistration(userData) {
  console.group("🔍 Debug: Registration Flow");

  console.log("Step 1 — Form values captured:", userData);

  if (!userData.name) {
    console.warn("Step 2 — Validation failed: name is empty.");
    console.groupEnd();
    return;
  }
  console.log("Step 2 — Validation passed.");

  const payload = JSON.stringify(userData);
  console.log("Step 3 — Payload to be sent:", payload);

  // Pause here in DevTools by opening the Sources panel and adding a breakpoint
  // on the fetch() call inside submitRegistration().
  debugger; // intentional breakpoint for DevTools demonstration

  console.log("Step 4 — Calling submitRegistration…");
  submitRegistration(userData);

  console.groupEnd();
}

// Test the debug flow (comment out in production)
// debugRegistration({ name: "Test User", email: "test@example.com", event: "music" });

/*
  HOW TO USE CHROME DEVTOOLS (Exercise 13 guidance):
  ─────────────────────────────────────────────────
  1. Console tab  : All console.log / warn / error messages appear here.
  2. Network tab  : After clicking Register, inspect the POST request to
                    jsonplaceholder.typicode.com — check Headers, Payload,
                    and Response.
  3. Sources tab  : Open main.js, click a line number to set a breakpoint.
                    Reload and step through with F10 (Step Over) / F11 (Step Into).
  4. The `debugger` statement above triggers an automatic breakpoint when
                    DevTools is open.
*/


/* ============================================================
   EXERCISE 14 — jQuery and JS Frameworks
   ============================================================ */

/*
  jQuery is loaded from a CDN in index.html. This section demonstrates
  jQuery DOM helpers alongside the vanilla JS already in place.

  NOTE: add this to <head> in index.html to enable jQuery:
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
*/

document.addEventListener("DOMContentLoaded", function () {

  // Guard — only run if jQuery is available on the page
  if (typeof $ === "undefined") {
    console.log("jQuery not loaded — skipping Exercise 14 demos.");
    return;
  }

  // --- Click handler via jQuery ---
  $("#registerBtn").click(function (e) {
    e.preventDefault();
    console.log("jQuery: Register button clicked.");
    // Delegate to the same submitRegistration logic
    const name  = $("#fullName").val().trim();
    const email = $("#email").val().trim();
    const event = $("#eventType").val();
    submitRegistration({ name, email, event });
  });

  // --- fadeIn / fadeOut for event cards ---
  // Fade all event cards in on load
  $(".eventCard").hide().fadeIn(800);

  // Double-clicking a card fades it out (simulates dismissal)
  $(document).on("dblclick", ".eventCard", function () {
    $(this).fadeOut(400, function () {
      $(this).remove();
    });
  });

  console.log("jQuery: Event card animations active. Double-click a card to dismiss it.");

});

/*
  WHY MOVE TO A FRAMEWORK?
  ─────────────────────────
  jQuery handles DOM manipulation and AJAX elegantly, but modern apps benefit
  from component-based frameworks like React or Vue:

  • React  – Virtual DOM diffing makes large-scale UI updates fast; JSX keeps
             markup and logic co-located; rich ecosystem (React Router, Redux).

  • Vue    – Gentler learning curve; two-way data binding via v-model; Single
             File Components keep HTML, CSS and JS neatly together in one file.

  Both frameworks enforce a clear separation of state and view, making
  applications far easier to test, scale, and maintain than jQuery spaghetti.
*/
