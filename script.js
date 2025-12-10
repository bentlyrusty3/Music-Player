const searchInput = document.getElementById("searchInput");
const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const notesContainer = document.getElementById("notesContainer");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

renderNotes();
addBtn.addEventListener("click", () => {
    const text = noteInput.value.trim();
    if(text === "") return;
    const newNote = {
        id: Date.now(),
        text,
        date: new Date().toLocaleString("fa-IR")
    }
    notes.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notes));
    noteInput.value = "";
    renderNotes();
});
function renderNotes(filter = "") {
    notesContainer.innerHTML = "";
    notes.filter((e) => e.text.includes(filter)).forEach(note => {
        const div = document.createElement("div");
        div.className = "note";
        div.innerHTML = `
            <small>${note.date}</small>
            <p>${note.text}</p>
            <button class="deleteBtn" onclick="deleteNote(${note.id})">Delete</button>
        `;
        notesContainer.appendChild(div);
    });
}
function deleteNote(id) {
    notes = notes.filter((e) => e.id !== id);
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes(searchInput.value);
}
searchInput.addEventListener("input", () => {
    renderNotes(searchInput.value);
});