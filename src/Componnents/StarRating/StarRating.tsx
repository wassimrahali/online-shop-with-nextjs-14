import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, reviewCount }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-full-${i}`} className="text-yellow-500" />);
    }

    if (halfStar) {
      stars.push(<FaStarHalfAlt key="star-half" className="text-yellow-500" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`star-empty-${i}`} className="text-yellow-500" />);
    }

    return stars;
  };

  return (
    <div className="flex items-center">
      <div className="flex">{renderStars()}</div>
      {reviewCount && (
        <span className="ml-2 text-gray-600">({reviewCount} reviews)</span>
      )}
    </div>
  );
};

export default StarRating;
