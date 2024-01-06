import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={260}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="140" cy="131" r="130" />
        <rect x="0" y="274" rx="5" ry="5" width="280" height="25" />
        <rect x="0" y="316" rx="5" ry="5" width="280" height="83" />
        <rect x="31" y="436" rx="0" ry="0" width="0" height="1" />
        <rect x="0" y="421" rx="5" ry="5" width="92" height="27" />
        <rect x="122" y="417" rx="30" ry="30" width="152" height="45" />
    </ContentLoader>
)

export default Skeleton