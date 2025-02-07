import MaxWidthWrapper from "@/components/defaults/MaxWidthWrapper";
import ModalCustom from "@/components/defaults/ModalCustom";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { SeachAcc } from "./SearchAccounts";
import CalendarInput2 from "@/components/CalendatInput";
import GridContainer from "@/components/defaults/GridContainer";
import FormTable from "./FormTable";

const SalesPage = () => {
  return (
    <section className=" text-sm text-right" dir="rtl">
      <MaxWidthWrapper className=" flex flex-col gap-4">
        <div className=" flex  ml-auto  mb-5 w-fit  flex-col gap-2 items-end">
          <div className="flex items-center gap-2">
            <Label className=" ml-auto">من المستودعات</Label>
            <Link className={`${buttonVariants({ variant: "default", size: "sm" })}`} to={"/add-sales"}>
              اضافة فاتورة مبيعات
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Label> فوترة مذكرات التسليم</Label>
            <Link className={buttonVariants({ variant: "default", size: "sm" })} to={"/add-sales"}>
              اضافة فاتورة مبيعات
            </Link>
          </div>
        </div>
        <div className=" max-w-6xl ml-auto relative px-4 py-2  flex flex-col gap-5 border border-input rounded-2xl">
          <h2 className=" font-semibold m -top-3 bg-white absolute ml-auto">استعلام فواتير المبيعات</h2>
          <GridContainer className=" pt-4" cols={2}>
            <div className=" flex items-center gap-2  pb-3 border-b border-input">
              <Label>حساب العميل: </Label>
              <Input className="  w-fit" placeholder="أدخل حساب العميل" />
              <div className=" mr-auto flex  items-center gap-2">
                <ModalCustom
                  btn={<SearchIcon className=" w-5 h-5 cursor-pointer hover:opacity-80 duration-200 " />}
                  content={<SeachAcc />}
                />
                <Button size={"sm"}>استعلام</Button>
              </div>
            </div>
            <div className=" flex items-center gap-2  pb-3 border-b border-input">
              <Label> العميل: </Label>
              <Input placeholder="أدخل حساب العميل" />
              <div className=" mr-auto flex  items-center gap-2">
                <ModalCustom
                  btn={<SearchIcon className=" w-5 h-5 cursor-pointer hover:opacity-80 duration-200 " />}
                  content={<SeachAcc />}
                />
                <Button size={"sm"}>استعلام</Button>
              </div>
            </div>
            <div className=" flex items-center gap-2  pb-3 border-b border-input">
              <Label> اسم العميل: </Label>
              <Input placeholder="أدخل حساب العميل" />
              <div className=" mr-auto flex  items-center gap-2">
                <ModalCustom
                  btn={<SearchIcon className=" w-5 h-5 cursor-pointer hover:opacity-80 duration-200 " />}
                  content={<SeachAcc />}
                />
                <Button size={"sm"}>استعلام</Button>
              </div>
            </div>
            <div className=" flex items-center gap-2  pb-3 border-b border-input">
              <Label> إسم المادة: </Label>
              <Input placeholder="أدخل حساب العميل" />
              <div className=" mr-auto flex  items-center gap-2">
                <ModalCustom
                  btn={<SearchIcon className=" w-5 h-5 cursor-pointer hover:opacity-80 duration-200 " />}
                  content={<SeachAcc />}
                />
                <Button size={"sm"}>استعلام</Button>
              </div>
            </div>
            <div className=" flex items-center gap-2  pb-2 border-b border-input">
              <Label> رقم الفاتورة: </Label>
              <Input placeholder="أدخل حساب العميل" />
              <div className=" mr-auto flex  items-center gap-2">
                <ModalCustom
                  btn={<SearchIcon className=" w-5 h-5 cursor-pointer hover:opacity-80 duration-200 " />}
                  content={<SeachAcc />}
                />
                <Button size={"sm"}>استعلام</Button>
              </div>
            </div>
            <div className=" flex items-center gap-2  pb-2 border-b border-input">
              <div className=" w-full justify-between flex  items-center gap-2">
                <div className="flex items-center gap-2">
                  <Label> من تاريخ: </Label>
                  <CalendarInput2 />
                </div>
                <div className="flex items-center gap-2">
                  <Label> الى تاريخ: </Label>
                  <CalendarInput2 />
                </div>
                <Button className="self-end mr-auto" size={"sm"}>
                  استعلام
                </Button>
              </div>
            </div>
          </GridContainer>
        </div>
        <FormTable/>
      </MaxWidthWrapper>
    </section>
  );
};

export default SalesPage;
