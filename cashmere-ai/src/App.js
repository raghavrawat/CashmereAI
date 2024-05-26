import { useEffect, useState } from 'react'
import Leads from './components/Leads/Leads'
import Pagination from './components/Pagination/Pagination'
import Loader from './components/Loader/Loader'
import { getLeads, deleteLeads, getThumbsUp, giveThumbsUp, deleteThumbsUp } from './utils/https'

import './App.css';

function App() {

  const [loading, setLoading] = useState(false)
  const [leads, setLeads] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [feedbackObject, setFeedbackObject] = useState({})

  const fetchLeads = async (page) => {
    setLoading(true)
    const res = await getLeads(page)
    const leads = res.leads.map(item => ({ ...item, isContacted: false }))
    setLeads(leads)
    setTotalResults(res.total_results)
    setLoading(false)
  }

  const fetchThumbs = async () => {
    const response = await getThumbsUp()
    const obj = {}
    response.forEach(element => {
      obj[element.lead_id] = element.sentiment
    });
    setFeedbackObject(obj)
  }

  useEffect(() => {
    fetchThumbs()
  }, [])

  useEffect(() => {
    fetchLeads(pageNumber)
  }, [pageNumber])

  const handleSelect = async (value, id) => {
    switch(value) {
      case 'delete': 
        await deleteLeads(id)
        fetchLeads(pageNumber)
        break
      case 'contacted': 
        setLeads(prevState => prevState.map(item => {
          return {
            ...item,
            isContacted: item._id === id ? true : item.isContacted
          }
        }))
        break
      default:
    }
  }

  const handleThumbs = async (value, id) => {
    if (value === 1 || value === -1) {
      await giveThumbsUp(id, value)
    } else {
      await deleteThumbsUp(id)
    }
    fetchThumbs()
  }

  return (
    <div className="app-container">
      <div className="page-title">Contacts data</div>
      {
        loading ?
          <div className="leads-loading-placeholder">
            <Loader />
          </div> :
          <>
            <div className="leads-container">
              {leads.map((lead, index) => {
                return (
                  <Leads 
                    key={index} 
                    lead={lead} 
                    feedbackObject={feedbackObject} 
                    handleSelect={handleSelect} 
                    handleThumbs={handleThumbs} 
                  />
                )
              })}
            </div>
            <div className="pagination-container">
              <Pagination 
                totalResults={totalResults} 
                pageNumber={pageNumber} 
                setPageNumber={setPageNumber}
              />
            </div>
          </>
      }
    </div>
  );
}

export default App;
