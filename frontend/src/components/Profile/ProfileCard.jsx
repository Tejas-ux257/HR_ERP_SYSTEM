export default function ProfileCard({
    profile,
    onEdit,
    onPassword,
}) {

    if (!profile) {
        return null;
    }

    return (
        <div className="card shadow">

            <div className="card-header bg-primary text-white">

                <h4>Employee Profile</h4>

            </div>

            <div className="card-body">

                <div className="row">

                    <div className="col-md-6">

                        <p><strong>Name:</strong> {profile.name}</p>

                        <p><strong>Email:</strong> {profile.email}</p>

                        <p><strong>Phone:</strong> {profile.phone}</p>

                        <p><strong>Department:</strong> {profile.department_name}</p>

                    </div>

                    <div className="col-md-6">

                        <p><strong>Address:</strong> {profile.address}</p>

                        <p><strong>Gender:</strong> {profile.gender}</p>

                        <p><strong>Date of Birth:</strong> {profile.dob}</p>

                    </div>

                </div>

                <hr />

                <button
                    className="btn btn-primary me-2"
                    onClick={onEdit}
                >
                    Edit Profile
                </button>

                <button
                    className="btn btn-warning"
                    onClick={onPassword}
                >
                    Change Password
                </button>

            </div>

        </div>
    );

}