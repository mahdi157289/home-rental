import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import ListingCard from "../components/ListingCard";
import Navbar from "../components/Navbar";
import "../styles/List.scss";

const WishList = () => {
  const wishList = useSelector((state) => state.user.wishList);

  return (
    <div className="property-list-container">
      <Navbar />
      <h1 className="title-list">Your Wish List</h1>
      <div className="list">
        {wishList && wishList.length > 0 ? (
          wishList.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking = false,
            }) => (
              <ListingCard
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )  ) : (
            <h1>No Wish List Yet. . </h1>
          )}
      </div>
      <Footer />
    </div>
  );
};

export default WishList;
