'use client'

import { Box, Typography, Button, Modal, TextField, MenuItem, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import { firestore } from '@/firebase';
import { collection, doc, getDocs, query, setDoc, deleteDoc, getDoc } from 'firebase/firestore';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'white', // White background for the modal box
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

const headerStyle = {
  backgroundColor: '#D8BFD8', // Light purple background for header
  fontSize: '24px',
  fontWeight: 'bold',
  padding: '16px',
};

const tagStyle = {
  backgroundColor: '#EDE7F6', // Very light purple for tags
  padding: '2px 6px',
  borderRadius: '4px',
  margin: '0 4px',
};

const boldText = {
  fontWeight: 'bold',
};

const entryStyle = {
  minHeight: '100px',  // Reduced height for each entry box
  padding: '8px',  // Adjusted padding
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
};

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [tags, setTags] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  const updateInventory = async () => {
    try {
      const snapshot = await getDocs(query(collection(firestore, 'inventory')));
      const inventoryList = [];
      snapshot.forEach((doc) => {
        inventoryList.push({ name: doc.id, ...doc.data() });
      });
      setInventory(inventoryList);
    } catch (e) {
      console.error('Error fetching inventory:', e);
    }
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const addItem = async (item, tags) => {
    try {
      const docRef = doc(collection(firestore, 'inventory'), item);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        await setDoc(docRef, { quantity: quantity + 1, tags }, { merge: true });
      } else {
        await setDoc(docRef, { quantity: 1, tags });
      }
      await updateInventory();
    } catch (e) {
      console.error('Error adding item:', e);
    }
  };

  const removeItem = async (item) => {
    try {
      const docRef = doc(collection(firestore, 'inventory'), item);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        if (quantity === 1) {
          await deleteDoc(docRef);
        } else {
          await setDoc(docRef, { quantity: quantity - 1 });
        }
        await updateInventory();
      }
    } catch (e) {
      console.error('Error removing item:', e);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const uniqueTags = Array.from(new Set(inventory.flatMap(item => item.tags || [])));

  const filteredInventory = inventory.filter(({ name, tags }) => {
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'All' || (tags || []).includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
      sx={{
        padding: '16px',
        backgroundColor: '#F3E5F5',  // Very light purple background
      }}
    >
      <Typography variant="h3" sx={boldText} mb={2}>
        Inventory Tracker
      </Typography>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <TextField
              id="tags"
              label="Tags (comma separated)"
              variant="outlined"
              fullWidth
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName, tags.split(',').map(tag => tag.trim()));
                setItemName('');
                setTags('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>
        Add New Item
      </Button>
      <Box
        width="800px"
        bgcolor={'white'} // White background for the content box
        borderRadius={'8px'}
        boxShadow={'0px 0px 10px rgba(0,0,0,0.1)'}
        p={3}
      >
        <Box
          width="100%"
          height="100px"
          bgcolor={'#D8BFD8'} // Light purple background for header
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          sx={headerStyle}
        >
          <Typography variant={'bold'} color={'#333'} textAlign={'center'}>
            Inventory Items
          </Typography>
        </Box>
        <Stack width="100%" spacing={2} mt={2}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <TextField
            label="Filter by Tag"
            select
            fullWidth
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            {uniqueTags.map(tag => (
              <MenuItem key={tag} value={tag} sx={tagStyle}>
                {tag}
              </MenuItem>
            ))}
          </TextField>
          <Stack height="300px" spacing={2} overflow={'auto'}>
            {filteredInventory.map(({ name, quantity, tags }) => (
              <Box
                key={name}
                width="100%"
                minHeight="100px"  // Reduced height for each entry box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                sx={entryStyle}
              >
                <Typography variant={'bold'} color={'#333'}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  {(tags || []).map(tag => (
                    <Typography key={tag} variant={'body2'} sx={tagStyle}>
                      {tag}
                    </Typography>
                  ))}
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Button
                    variant="outlined"
                    onClick={() => removeItem(name)}
                  >
                    -
                  </Button>
                  <Typography variant={'bold'}>
                    {quantity}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => addItem(name, tags)}
                  >
                    +
                  </Button>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
