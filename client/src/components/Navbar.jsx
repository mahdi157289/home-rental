import { Menu, Person, Search } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { setLogout, setPropertyList } from "../redux/state";
import "../styles/Navbar.scss";
import variables from "../styles/variables.scss";


const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const propertyList = user?.propertyList;
  const [search, setSearch] = useState("")
  console.log("Navbar propertyList:", propertyList);
 // Initialize as empty array

  const navigate = useNavigate()
const getPropertyList = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${user._id}/properties`, {
        method: "GET",
      });
      const data = await response.json();
      console.log("Fetched data:", data);
      console.log(data);
      dispatch(setPropertyList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch all properties failed", err.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      getPropertyList();
    } else {
      setLoading(false);
    }
  }, [user]);
  return loading ? <Loader /> :(
    <div className="navbar">
      <a href="/">
        <img src="/assets/logo.png" alt="logo" />
      </a>

      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton disabled={search === ""}>
          <Search
            sx={{ color: variables.pinkred }}
            onClick={() => { navigate(`/properties/search/${search}`) }}
          />
        </IconButton>
      </div>

      <div className="navbar_right">
        {user ? (
          <a href="/create-listing" className="host">
            Become A Host
          </a>
        ) : (
          <a href="/login" className="host">
            Become A Host
          </a>
        )}

        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu sx={{ color: variables.darkgrey }} />
          {!user ? (
            <Person sx={{ color: variables.darkgrey }} />
          ) : (
            <img
              src={`http://localhost:3001/${user.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="profile photo"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to={`/${user._id}/trips`}>Trip List</Link>
            <Link to={`/${user._id}/wishList`}>Wish List</Link>
            {propertyList && propertyList.length > 0 && (
            <Link to={`/${user._id}/properties`}>Property List</Link>
          )}
            <Link to={`/${user._id}/reservations`}>Reservation List</Link>


            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogout());
              }}
              className="logout-link"
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
