# Calc cash operations app

  Users can go to a branch to cash in and/or cash out from account.
There are also commission fees for both cash in and cash out. Only supported currency is EUR.

  The program accepts a path to the input file. The program outputs result to the console.
Result - calculated commission fees for each operation.

Input data is given in JSON file. Performed operations are given in that file. In each object following data is provided:
```json
{
    "date": "2016-01-05", // operation date in format `Y-m-d`
    "user_id": 1, // user id, integer
    "user_type": "natural", // user type, one of “natural”(natural person) or “juridical”(legal person)
    "type": "cash_in", // operation type, one of “cash_in” or “cash_out”
    "operation": {
        "amount": 200, // operation amount(for example `2.12` or `3`)
        "currency": "EUR" // operation currency `EUR`
    }
}
```
All operations are ordered by their date ascendingly.

1. In order to calculate data you should provide a path for an input file. Then run the following command:
```npm run calc```
Project already has the input.json file in the root of project.

2. Run tests
```npm run test```

