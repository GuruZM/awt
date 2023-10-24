import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React,{useState} from "react";

import { Card, Typography, Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input, } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import { Link, useForm } from '@inertiajs/react';
const TABLE_HEAD = ["ID", "Status"];
 
export default function Dashboard({ auth , classes,grades,registers}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    const { data, setData, post, processing, errors, reset } = useForm({
      comment: '',
      grade_id:'',
      classes_id:'',
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(data);
      post(route('registers.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Register</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900"><Button onClick={handleOpen} variant="gradient">
        Add Register
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
          {registers.map(({ id,comment }, index) => {
            const isLast = index === registers.length - 1;
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
                    {comment}
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
        <form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="comment"
        value={data.comment}
        onChange={(e) => setData('comment', e.target.value)}
        label='Comment'
      />
        <div className="w-full">
      <select
      value={data.grade_id}
      name='grade_id'
      className='select mt-3 select-ghost w-full text-black items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200'
      onChange={(e) => setData('grade_id', e.target.value)}
      label="Select Grade">
        <option value=" "></option>
          {
              grades.map(({ id,name }, index) => {
                  return (
                      <option key={id} value={id}>{name}</option>
                  );
              })
          }
         
 
      </select>
    </div>
    <div className="w-full">
      <select 
      value={data.classes_id}
      name='classes_id'
      className='select mt-3 select-ghost w-full text-black items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200'
      onChange={(e) => setData('classes_id', e.target.value)}
      label="Select Class">
        <option value=""></option>
        {
            classes.map(({ id,name }, index) => {
                return (
                    <option key={id} value={id}>{name}</option>
                );
            })
        }
       
      </select>
    </div>
      <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" type='submit' color="green" onClick={handleOpen}>
            <span>Submit</span>
          </Button>
    </form>
        </DialogBody>
        <DialogFooter>
           
        </DialogFooter>
      </Dialog>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
