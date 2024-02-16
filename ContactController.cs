using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System.Reflection.Metadata.Ecma335;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly ContactContext _contactContext;
        public ContactController(ContactContext contactContext)
        {
            _contactContext = contactContext;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            if (_contactContext.Contacts == null)
            {
                return NotFound();
            }
            return await _contactContext.Contacts.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(int id)
        {
            if (_contactContext.Contacts == null)
            {
                return NotFound();
            }
            var contact =await _contactContext.Contacts.FindAsync(id);
            if(contact == null)
            {
                return NotFound();
            }
            return contact;
        }
        [HttpPost]
        public async Task<ActionResult<Contact>> PostContact(Contact contact)
        {
            _contactContext.Contacts.Add(contact);
            await _contactContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetContact), new { id = contact.Id }, contact);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> PutContact(int id,Contact contact)
        {
            if(id != contact.Id)
            {
                return BadRequest();
            }
            _contactContext.Entry(contact).State = EntityState.Modified;
            try
            {
                await _contactContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteContact(int id)
        {
            if(_contactContext.Contacts == null)
            {
                return NotFound();
            }
            var contact = await _contactContext.Contacts.FindAsync(id);
            if(contact == null)
            {
                return NotFound();
            }
            _contactContext.Contacts.Remove(contact);
            await _contactContext.SaveChangesAsync();
            return Ok();
        }
    }
}
