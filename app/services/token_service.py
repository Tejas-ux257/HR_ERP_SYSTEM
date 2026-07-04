from datetime import datetime

from app.database import get_db_connection


def revoke_token(jti, expires_at):
    """
    Add a JWT to the blacklist so it cannot be reused after logout.
    """

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            INSERT INTO token_blacklist (jti, expires_at)
            VALUES (%s, %s)
            """,
            (jti, expires_at)
        )

        conn.commit()

    finally:
        cursor.close()
        conn.close()


def is_token_revoked(jti):
    """
    Check whether a JWT has been revoked.
    """

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT id
        FROM token_blacklist
        WHERE jti=%s
        """,
        (jti,)
    )

    row = cursor.fetchone()

    cursor.close()
    conn.close()

    return row is not None


def cleanup_expired_tokens():
    """
    Remove expired blacklist entries and used reset tokens.
    """

    conn = get_db_connection()
    cursor = conn.cursor()

    now = datetime.utcnow()

    cursor.execute(
        """
        DELETE FROM token_blacklist
        WHERE expires_at < %s
        """,
        (now,)
    )

    cursor.execute(
        """
        DELETE FROM password_reset_tokens
        WHERE expires_at < %s OR used = 1
        """,
        (now,)
    )

    conn.commit()
    cursor.close()
    conn.close()
