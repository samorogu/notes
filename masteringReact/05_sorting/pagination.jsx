import React from "react";
import PropTypes from "prop-types";
import _ from "lodash"; //optimization from underscore

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  //console.log(currentPage);
  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) return null;

  const pages = _.range(1, pagesCount + 1); //if pages count is 3, the range will be 2, so we need to increment by 1

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a
              className="page-link"
              /*type="button"
              className="link-button"
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
                display: "inline",
                margin: "0",
                padding: "0"
              }}*/
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
