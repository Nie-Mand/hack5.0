import {
  Context,
  Contract,
  Info,
  Returns,
  Transaction,
} from "fabric-contract-api";
import stringify from "json-stringify-deterministic";
import sortKeysRecursive from "sort-keys-recursive";
import { Invoice } from "./invoice.asset";

@Info({
  title: "AssetTransfer",
  description: "Smart contract for trading assets",
})
export class InvoiceTransferContract extends Contract {
  @Transaction()
  public async CreateInvoice(
    ctx: Context,
    id: string,
    productName: string,
    UnitPrice: number,
    description: string,
    customer: string,
    url: string,
    when: string,
    owner: string
  ): Promise<void> {

    const exists = await this.InvoiceExists(ctx, id);
    if (exists) {
      throw new Error(`The asset ${id} already exists`);
    }

    const invoice: Invoice = {
      ID: id,
      ProductName: productName,
      UnitPrice: UnitPrice,
      Description: description,
      Customer: customer,
      Url: url,
      When: when,
      Status: "Created",
      Owner: owner,
    };


    const buffer = Buffer.from(stringify(sortKeysRecursive(invoice)))

		ctx.stub.setEvent('CreateInvoice', buffer);

    await ctx.stub.putState(
      id,
      buffer
    );
  }

  @Transaction(false)
  public async GetInvoice(ctx: Context, id: string): Promise<string> {
    const assetJSON = await ctx.stub.getState(id);
    if (!assetJSON || assetJSON.length === 0) {
      throw new Error(`The asset ${id} does not exist`);
    }
    return assetJSON.toString();
  }

  @Transaction(false)
  @Returns("boolean")
  public async InvoiceExists(ctx: Context, id: string): Promise<boolean> {
    const assetJSON = await ctx.stub.getState(id);
    return assetJSON && assetJSON.length > 0;
  }

  @Transaction(false)
  @Returns("string")
  public async GetUnhandledInvoices(
    ctx: Context,
    owner: string
  ): Promise<string> {
    const allResults = [];
    const iterator = await ctx.stub.getStateByRange("", "");
    let result = await iterator.next();
    while (!result.done) {
      const strValue = Buffer.from(result.value.value.toString()).toString(
        "utf8"
      );
      let record: Invoice;
      try {
        record = JSON.parse(strValue);
      } catch (err) {
        console.log(err);
      }
      if (record.Status === "Created" && (record.Owner === owner || record.Customer === owner)) {
        allResults.push(record);
      }
      result = await iterator.next();
    }
    return JSON.stringify(allResults);
  }

  @Transaction(false)
  @Returns("string")
  public async GetMyInvoices(
    ctx: Context,
    owner: string
  ): Promise<string> {
    const allResults = [];
    const iterator = await ctx.stub.getStateByRange("", "");
    let result = await iterator.next();
    while (!result.done) {
      const strValue = Buffer.from(result.value.value.toString()).toString(
        "utf8"
      );
      let record: Invoice;
      try {
        record = JSON.parse(strValue);
      } catch (err) {
        console.log(err);
      }
      if (record.Status === "Signed" && (record.Owner === owner || record.Customer === owner)) {
        allResults.push(record);
      }
      result = await iterator.next();
    }
    return JSON.stringify(allResults);
  }


    @Transaction()
    public async SignInvoice(
        ctx: Context,
        id: string,
        // owner: string
    ): Promise<void> {
        const exists = await this.InvoiceExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }

        const invoiceJSON = await ctx.stub.getState(id);
        const invoice: Invoice = JSON.parse(invoiceJSON.toString());
        invoice.Status = "Signed";

        if (invoice.Owner === invoice.Customer) {
            invoice.Status = "Paid";
        }


        const buffer = Buffer.from(stringify(sortKeysRecursive(invoice)))

		    ctx.stub.setEvent('SignInvoice', buffer);

        await ctx.stub.putState(
            id,
            buffer
        );
    }

    @Transaction()
    public async UpdateInvoice(
        ctx: Context,
        id: string,
        UnitPrice: number
    ): Promise<void> {
        const exists = await this.InvoiceExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }

        const invoiceJSON = await ctx.stub.getState(id);
        const invoice: Invoice = JSON.parse(invoiceJSON.toString());
        invoice.UnitPrice = UnitPrice;

        const buffer = Buffer.from(stringify(sortKeysRecursive(invoice)))

		    ctx.stub.setEvent('SignInvoice', buffer);

        await ctx.stub.putState(
            id,
            buffer
        );
    }
}



// query invoices grouped by expenses
// ABAC for invoices