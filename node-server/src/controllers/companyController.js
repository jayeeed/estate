
// Define a schema for your company model
const companySchema = new mongoose.Schema({
  companyName: String,
  registrationNumber: String,
  newAddress: String,
  bankAccountNumber: String,
  additionalDetails: String,
});

const Company = mongoose.model('Company', companySchema);

// Define routes
app.get('/api/companies/:id', async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching company data' });
  }
});

app.put('/api/companies/:id', async (req, res) => {
  try {
    const companyId = req.params.id;
    const updatedCompanyData = req.body;
    const updatedCompany = await Company.findByIdAndUpdate(companyId, updatedCompanyData, { new: true });
    res.json(updatedCompany);
  } catch (error) {
    res.status(500).json({ error: 'Error updating company data' });
  }
});

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
