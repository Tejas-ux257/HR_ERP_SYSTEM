function LoadingSpinner({

    message = "Loading..."

}) {

    return (

        <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{
                minHeight: "300px",
            }}
        >

            <div
                className="spinner-border text-primary"
                role="status"
            >
                <span className="visually-hidden">
                    Loading...
                </span>
            </div>

            <p className="mt-3 text-muted">
                {message}
            </p>

        </div>

    );

}

export default LoadingSpinner;