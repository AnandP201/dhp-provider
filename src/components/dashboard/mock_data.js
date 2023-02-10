import { faker } from "@faker-js/faker/locale/en";

export const lineChartData = [
  {
    id: "japan",
    color: "hsl(25, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 208,
      },
      {
        x: "helicopter",
        y: 87,
      },
      {
        x: "boat",
        y: 37,
      },
      {
        x: "train",
        y: 15,
      },
      {
        x: "subway",
        y: 135,
      },
    ],
  },
];

export function mockUsers(length) {
  const createRowData = (rowIndex) => {
    const status = "Therapy";

    const diagnosis = ["Leukemia", "Brain", "Lymphoma", "Bone"][
      (Math.random() * 4) << 0
    ];

    const sex = faker.name.sex(true);

    const patientName = faker.name.fullName(
      faker.name.firstName(),
      faker.name.lastName(),
      sex
    );

    const therapistName = faker.name.fullName(
      faker.name.firstName(),
      faker.name.lastName(),
      sex
    );

    const avatar = faker.image.avatar();

    const age = Math.floor(Math.random() * 30) + 18;

    return {
      id: rowIndex + 1,
      patientName,
      avatar,
      sex,
      age,
      therapistName,
      status,
      diagnosis,
    };
  };

  return Array.from({ length }).map((_, index) => {
    return createRowData(index);
  });
}
