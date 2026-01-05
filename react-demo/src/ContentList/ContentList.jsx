import { useEffect, useState } from "react";
import dataBase from "./example.json";

export default function ContentList() {
  const [view, setView] = useState("browse"); // Changes the view
  const [playlists, setPlaylists] = useState([]); // List of playlist
  const [content, setContent] = useState([]); // Data for content of database
  const [searchContent, setSearchContent] = useState(""); // Search value
  const [activePlaylist, setActivePlaylist] = useState(null);

  // New playlist states
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [selectedContent, setSelectedContent] = useState([]);
  const [selectionSearch, setSelectionSearch] = useState("");

  // This function creates a new playlist with content added
  const handleSavePlaylist = () => {
    if (!newPlaylistName || selectedContent.length === 0) {
      return alert("Error: Fill in playlist name or add content to playlist");
    }

    let validatedName = newPlaylistName;
    // Get all names of playlist
    const existingNames = playlists.map((playlist) => playlist.name); 

    // Check if Name already exist
    if (existingNames.includes(validatedName)) {
      setNewPlaylistName("");
      return alert("Error: Name of playlist already exist change the name");
    }

    // Create playlist
    setPlaylists([
      ...playlists,
      { id: Date.now(), name: validatedName, content: selectedContent },
    ]);

    // Reset
    setNewPlaylistName("");
    setSelectedContent([]);
    setSelectionSearch("");
    setView("library");
  };

  useEffect(() => {
    setContent(dataBase); // get file list from data base
  }, []);

  // Content list for selecting when creating playlist
  const selectionSearchContent = () => {
    // Filter content based on selectionSearch result
    const selectionContentList = content.filter((file) =>
      file.title.toLowerCase().includes(selectionSearch.toLowerCase())
    );
    return (
      <>
        {selectionContentList.map((content) => (
          <div
            key={content.id}
            style={{
              marginBottom: 10,
              padding: 10,
              border: "2px solid",
              display: "flex",
              flexDirection: "row",
              alignItems: "end",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3>{content.title}</h3>
              <audio controls src={`${content.filepath}`} />
            </div>
            <button
              onClick={() =>
                setSelectedContent((prev) =>
                  prev.some((i) => i.id === content.id)
                    ? prev.filter((i) => i.id !== content.id)
                    : [...prev, content]
                )
              }
            >
              {selectedContent.some((i) => i.id === content.id)
                ? "Content Selected"
                : "Select"}
            </button>
          </div>
        ))}
      </>
    );
  };

  // Content list for browse
  const BrowseContentList = () => {
    // Filter content based on search result
    const searchContentFilter = content.filter((file) =>
      file.title.toLowerCase().includes(searchContent.toLowerCase())
    );
    return (
      <>
        {searchContentFilter.map((content) => (
          <div key={content.id} style={{ marginBottom: 10, border: "1px solid", padding: 10}}>
            <h3>{content.title}</h3>
            <audio controls src={`${content.filepath}`} />
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <nav style={{ display: "flex", gap: "0.5rem" }}>
        <button onClick={() => setView("browse")}>Browse All</button>
        <button onClick={() => setView("create")}>Create Playlist</button>
        <button onClick={() => setView("library")}>My Library</button>
      </nav>
      {/* VIEW: browse content / search */}
      {view === "browse" && (
        <>
          <h3>Listen content</h3>
          <div>
            <input
              style={{
                height: "2rem",
                fontSize: "1rem",
                padding: "0 5px",
                marginBottom: 20
              }}
              type="text"
              placeholder={"Search Content"}
              value={searchContent}
              onChange={(e) => setSearchContent(e.target.value)}
            />
          </div>
          {BrowseContentList()}
        </>
      )}

      {/* Create Playlist View */}
      {view === "create" && (
        <div
          style={{
            padding: 10,
            border: "#424242 1px solid",
          }}
        >
          <h3>Step 1: Playlist Details</h3>
          <input
            type="text"
            placeholder="Enter Playlist Name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <h3>Step 2: Search and Select Content</h3>
          <input
            type="text"
            placeholder="Search Content to add..."
            value={selectionSearch}
            onChange={(e) => setSelectionSearch(e.target.value)}
          />
          <div style={{ marginTop: 15 }}>
            {selectionSearchContent()}
            <div>
              <p>{selectedContent.length} content selected</p>
              <button onClick={handleSavePlaylist}>Save Playlist</button>
            </div>
          </div>
        </div>
      )}

      {/* Playlist Library */}
      {view === "library" && (
        <div>
          <h2 style={{ textAlign: "center" }}>
            Playlist {activePlaylist ? "Details" : "Library"}
          </h2>
          {!activePlaylist ? (
            <div>
              {playlists.length === 0 && (
                <p>There are no playlist in library</p>
              )}
              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    border: "2px solid",
                    paddingBottom: 10,
                    marginBottom: 10,
                  }}
                >
                  <h3>{playlist.name}</h3>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: "100%",
                    }}
                  >
                    <p>Amount of Content: {playlist.content.length}</p>
                    <button onClick={() => setActivePlaylist(playlist)}>
                      Playlist Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h2>Playlist: {activePlaylist.name}</h2>
              {activePlaylist.content.map((content) => (
                <div
                  key={content.id}
                  style={{ marginBottom: 10, border: "1px solid", padding: 10}}
                >
                  <h3>{content.title}</h3>
                  <audio controls src={`${content.filepath}`} />
                </div>
              ))}
              <button onClick={() => setActivePlaylist(null)}>
                Back to Library
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
