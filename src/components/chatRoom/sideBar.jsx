import Chats from "./Chats";
import Search from "./Search";
import Navbar from "./navbar";

function SideBar() {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
}

export default SideBar;
