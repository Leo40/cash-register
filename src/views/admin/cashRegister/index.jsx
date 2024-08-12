import {
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  Input,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import Products from "./components/Products";
import { productsDataColumns } from "views/admin/dataTables/variables/columnsData";
import tableDataColumnsRaw from "views/admin/dataTables/variables/tableDataColumns.json";
import Card from "components/card/Card";
import { useState } from "react";

export default function CashRegister() {
  const [tableDataColumns, setTableDataColumns] = useState(tableDataColumnsRaw);
  const [scanValue, setScanValue] = useState("");
  const [quantity, setQuantity] = useState("");
  const handleScanChange = (e) => {
    setScanValue(e.target.value);
  };
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  const handleDeleteItem = (cell) => {
    const updatedTableDataColumns = tableDataColumns.filter(
      (column) => column.id !== cell.row.values.id
    );
    setTableDataColumns(updatedTableDataColumns);
  };
  // const handleItemChange = () => {}
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} color="secondaryGray.900">
      {/* Main Fields */}
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "2fr 1fr",
        }}
        templateRows={{
          base: "repeat(1, 1fr)",
          lg: "2fr 1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}
      >
        <GridItem rowSpan={1} colSpan={1}>
          <Card height="auto" mb={5}>
            <Grid templateColumns="2fr 1fr" gap={6}>
              <GridItem rowSpan={1} colSpan={1}>
                <Text textAlign="left">Item Name</Text>
                <Input
                  value={scanValue}
                  onChange={handleScanChange}
                  placeholder="Scan baracode now"
                  size="sm"
                />
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <Text textAlign="left">Quantity</Text>
                <Input
                  value={quantity}
                  onChange={handleQuantityChange}
                  placeholder="Quantity"
                  size="sm"
                  w="50%"
                />
              </GridItem>
            </Grid>
          </Card>
          <Products
            columnsData={productsDataColumns}
            tableData={tableDataColumns}
            handleDeleteItem={handleDeleteItem}
          />
        </GridItem>
        <GridItem rowSpan={2} colSpan={1}>
          <VStack
            spacing={4}
            align="stretch"
            w="full"
            p={5}
            borderRadius="20px"
            bg="white"
            divider={<StackDivider borderColor="gray.200" />}
          >
            <Text fontSize="2xl" fontWeight="semibold">
              Summary
            </Text>
            <Box>
              <Grid templateColumns="1fr auto" gap={6}>
                <Text>1x Product 1</Text>
                <Text textAlign="right">$10.99</Text>

                <Text>5x Product 2</Text>
                <Text textAlign="right">$50.99</Text>

                <Text>3x Product 3</Text>
                <Text textAlign="right">$17.99</Text>

                <Text>7x Product 5</Text>
                <Text textAlign="right">$99.99</Text>

                <Text>7x Product 6</Text>
                <Text textAlign="right">$99.99</Text>

                <Text>2x Product 7</Text>
                <Text textAlign="right">$99.99</Text>
              </Grid>
            </Box>
            <Box>
              <Grid templateColumns="1fr auto" gap={6}>
                <Text>Item subtotal:</Text>
                <Text textAlign="right">$179.96</Text>
                <Text>Discount:</Text>
                <Text textAlign="right">$0</Text>
                <Text>VAT (15%):</Text>
                <Text textAlign="right">$26.95</Text>
              </Grid>
            </Box>
            <Box>
              <Grid templateColumns="1fr auto" gap={6}>
                <Text fontSize="xl" fontWeight="bold">
                  Total:
                </Text>
                <Text>$206.95</Text>
              </Grid>
            </Box>
            <Button colorScheme="blue" w="full">
              Pay $206.95
            </Button>
          </VStack>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Grid
            templateColumns={{
              base: "1fr",
              lg: "repeat(5, 1fr)",
            }}
            templateRows={{
              base: "repeat(2, 1fr)",
              //   lg: "2fr 1fr",
            }}
            gap={{ base: "20px", xl: "20px" }}
          >
            <GridItem rowSpan={1} colSpan={1}>
              <Card height="100%">Electronics</Card>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Card height="100%">Homeware</Card>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Card height="100%">Health and Weallness</Card>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Card height="100%">Sports and Outdoors</Card>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Card height="100%">Groceries</Card>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Card height="100%">Electronics</Card>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Card height="100%">Homeware</Card>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Card height="100%">Health and Weallness</Card>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Card height="100%">Sports and Outdoors</Card>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Card height="100%">Office Supplies</Card>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  );
}
