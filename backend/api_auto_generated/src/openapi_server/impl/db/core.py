from contextlib import contextmanager
from pathlib import Path 

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session, declarative_base

from sqlalchemy.orm import mapped_column, Mapped
from sqlalchemy import String, Boolean


SQLALCHEMY_DATABASE_URL = f'sqlite:///{Path(__file__).parent}/sample.sqlite'


_engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

Base = declarative_base()

class User(Base):
    __tablename__ = "user"
    name: Mapped[str] = mapped_column(String(30), nullable=False)
    email: Mapped[str] = mapped_column(String(30), primary_key=True)
    role: Mapped[str] = mapped_column(String(10), nullable=False, default="general")
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    disabled: Mapped[bool] = mapped_column(Boolean, nullable=False)
    def __repr__(self) -> str:
        return f"User(name={self.name!r}, email={self.email!r}, disabled={self.disabled!r}, role={self.role!r})"


Base.metadata.create_all(_engine)

_SessionLocal = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=_engine))

@contextmanager
def get_db_session():
    # Code to acquire resource, e.g.:
    session = _SessionLocal()
    try:
        yield session
    except:
        session.rollback()
        raise
    else:
        _SessionLocal.remove()

if __name__=="__main__":
    from sqlalchemy import select
    # reset db
    admin = User(
        name="John Doe", 
        email="johndoe@example.com", 
        hashed_password="$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        role="admin",
        disabled=False,
    )
    general= User(
        name="Foo Bar", 
        email="general@example.com", 
        hashed_password="$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        role="general",
        disabled=False,
    )
    with get_db_session() as sess:
        stmt = select(User)
        results = sess.execute(stmt).scalars()
        for result in results:
            sess.delete(result)
        sess.commit()

    with get_db_session() as sess:
        sess.add_all([admin, general])
        sess.commit()

    with get_db_session() as sess:
        stmt = select(User)
        results = sess.execute(stmt).scalars()
        for result in results:
            print(result)