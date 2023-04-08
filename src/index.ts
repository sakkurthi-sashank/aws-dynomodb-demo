import {
  DynamoDBClient,
  CreateTableCommand,
  PutItemCommand,
  ScanCommand,
  GetItemCommand,
  DeleteTableCommand,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "YOUR_ACCESS_KEY_ID",
    secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
  },
});

// create a table
const params = {
  TableName: "Students",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" }, // Partition key
    { AttributeName: "Age", KeyType: "RANGE" }, // Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" },
    { AttributeName: "Age", AttributeType: "N" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
};

// create the table
const createTable = async () => {
  try {
    const data = await client.send(new CreateTableCommand(params));
    console.log("Table Created", data);
  } catch (err) {
    console.log("Error", err);
  }
};

// add an item to the table
const addStudent = async () => {
  const params = {
    TableName: "Students",
    Item: {
      id: { S: "1" },
      Name: { S: "John" },
      Age: { N: "20" },
    },
  };

  try {
    const data = await client.send(new PutItemCommand(params));
    console.log("Student Added", data);
  } catch (err) {
    console.log("Error", err);
  }
};

// get All Students from the table
const getAllStudents = async () => {
  const params = {
    TableName: "Students",
  };

  try {
    const data = await client.send(new ScanCommand(params));
    console.log("Student Added", data);
  } catch (err) {
    console.log("Error", err);
  }
};

// get a student by age
const getStudentByAge = async () => {
  const params = {
    TableName: "Students",
    Key: {
      id: { S: "1" },
      Age: { N: "20" },
    },
  };

  try {
    const data = await client.send(new GetItemCommand(params));
    console.log("Student Added", data);
  } catch (err) {
    console.log("Error", err);
  }
};

// delete student table
const deleteTable = async () => {
  const params = {
    TableName: "Students",
  };

  try {
    const data = await client.send(new DeleteTableCommand(params));
    console.log("Table Deleted", data);
  } catch (err) {
    console.log("Error", err);
  }
};

createTable();

setTimeout(() => {
  addStudent();
}, 5000);

setTimeout(() => {
  getAllStudents();
}, 10000);

setTimeout(() => {
  getStudentByAge();
}, 15000);

setTimeout(() => {
  deleteTable();
}, 20000);
