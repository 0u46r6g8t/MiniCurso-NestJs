export const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

export const subjectsServiceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

export const resetMocks = (classMock: Record<string, jest.Mock>) => {
  Object.keys(classMock).forEach((key) => {
    classMock[key].mockReset();
  });
};
