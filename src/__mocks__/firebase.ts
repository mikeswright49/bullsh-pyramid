const firebaseMock = {
    apps: [],
    initializeApp: jest.fn(),
    auth: jest.fn(),
    database: jest.fn(),
};

const MockDBObject = {
    on: jest.fn(),
    child: jest.fn(),
    val: jest.fn(),
    once: jest.fn(),
    update: jest.fn(),
    set: jest.fn().mockReturnValue(Promise.resolve()),
    push: jest.fn().mockReturnValue(Promise.resolve()),
};
MockDBObject.child.mockReturnValue(MockDBObject);
MockDBObject.once.mockReturnValue(Promise.resolve(MockDBObject));
MockDBObject.child.mockReturnValue(MockDBObject);

firebaseMock.auth.mockReturnValue({ signInAnonymously: jest.fn() });
firebaseMock.database.mockReturnValue({
    ref: jest.fn().mockReturnValue(MockDBObject),
});
export default firebaseMock;
