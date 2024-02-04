const Pagination = (props) => {
    const pagesCount = Math.ceil(props.length / props.itemsPerPage);
    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            {pagesCount > 1 && (
                <ul className="pagination">
                    <li className={"page-item" + (props.currentPage === 1 ? " disabled" : "")}>
                        <button className="page-link" onClick={() => props.onPageChanged(props.currentPage - 1)}>&laquo;</button>
                    </li>
                    {pages.map(page => (
                        <li key={page} className={"page-item" + (props.currentPage === page ? " active" : "")}>
                            <button className="page-link" onClick={() => props.onPageChanged(page)}>{page}</button>
                        </li>
                    ))}
                    <li className={"page-item" + (props.currentPage === pagesCount ? " disabled" : "")}>
                        <button
                            className="page-link"
                            onClick={() => props.onPageChanged(props.currentPage + 1)}
                            disabled={props.currentPage === pagesCount}  // Ajout de la condition ici
                        >
                            &raquo;
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
}

Pagination.getData = (items, currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage;
    return items.slice(start, start + itemsPerPage);
}

export default Pagination;
