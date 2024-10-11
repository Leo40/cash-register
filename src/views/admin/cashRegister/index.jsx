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

const CATEGORIES = [
  "Electronics",
  "Homeware",
  "Health and Weallness",
  "Sports and Outdoors",
  "Groceries",
  "Apparel",
  "Toiletries",
  "Gadgets",
  "Beauty",
  "Office Supplies ",
];
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
  const handleCategory = (category) => {};

  const getProductsTotal = () => {
    const total = tableDataColumns.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(",", ""));
      return sum + price;
    }, 0);
    return total;
  };

  const getVAT = () => getProductsTotal() * 0.15;

  const getGrandTotal = () => {
    const grandTotal = getProductsTotal() + getVAT();
    return `$${grandTotal.toLocaleString()}`;
  };

  const grandTotal = getGrandTotal();

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} color="secondaryGray.900">
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
            <Grid templateColumns="3fr 1fr 1fr" gap={6}>
              <GridItem rowSpan={1} colSpan={1}>
                <Text textAlign="left">Item Name</Text>
                <Input
                  value={scanValue}
                  onChange={handleScanChange}
                  placeholder="Search item or scan baracode now..."
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
                  w="100%"
                />
              </GridItem>
              <GridItem
                rowSpan={1}
                colSpan={1}
                marginTop="auto"
                alignItems="flex-end"
                marginLeft="auto"
              >
                <Button
                  isLoading={false}
                  loadingText="Submitting"
                  colorScheme="teal"
                  variant="solid"
                >
                  Submit
                </Button>
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
                {tableDataColumns.map((product) => (
                  <>
                    <Text>{`${product.quantity}x ${product.name}`} </Text>
                    <Text textAlign="right">{`$${product.price}`}</Text>
                  </>
                ))}
              </Grid>
            </Box>
            <Box>
              <Grid templateColumns="1fr auto" gap={6}>
                <Text>Item subtotal:</Text>
                <Text textAlign="right">{`$${getProductsTotal().toLocaleString()}`}</Text>
                <Text>Discount:</Text>
                <Text textAlign="right">$0</Text>
                <Text>VAT (15%):</Text>
                <Text textAlign="right">{`$${getVAT()}`}</Text>
              </Grid>
            </Box>
            <Box>
              <Grid templateColumns="1fr auto" gap={6}>
                <Text fontSize="xl" fontWeight="bold">
                  Total:
                </Text>
                <Text>{grandTotal}</Text>
              </Grid>
            </Box>
            <Button colorScheme="blue" w="full">
              Pay {grandTotal}
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
            {CATEGORIES.map((category) => (
              <GridItem
                rowSpan={1}
                colSpan={1}
                onClick={() => handleCategory(category)}
                cursor="pointer"
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                    "&:hover": {
                      backgroundColor: "gray.200",
                    },
                  }}
                >
                  {category}
                </Card>
              </GridItem>
            ))}
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  );
}
