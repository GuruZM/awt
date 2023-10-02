import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React,{useState} from "react";

import { Card, Typography, Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input, } from "@material-tailwind/react";

const TABLE_HEAD = ["ID", "Name"];

const TABLE_ROWS = [
    {
        id: "1",
      name: "John Michael",
 
    },
    
    {
        id: "2",
      name: "Richard Gran",
    
    },
  ];
export default function Dashboard({ auth }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900"><Button onClick={handleOpen} variant="gradient">
        Add Grade
      </Button></div>
                        <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ id,name }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={id}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {id}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>
 
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>

    <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Fill in form.</DialogHeader>
        <DialogBody divider>
           <form action="">
            <Input type="text" color="lightBlue" placeholder="Class Name" />
           </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
