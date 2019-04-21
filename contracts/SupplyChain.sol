pragma solidity ^0.5.0;

contract SupplyChain {

    // 记录supplier, manufacturer, distributor, retailer, certificate的个数
    uint public s = 1;
    uint public m = 1;
    uint public d = 1;
    uint public r = 1;
    uint public t = 1;


    struct supplier {
        bytes sid;      // supplier id
        bytes32 sname;  // supplier name
        bytes32 sloc;   // supplier location
        bytes32 material;
        uint scontact;  // contact(i.e., phone number)
        uint sexprice;  // expected price
    }

    //相似
    struct manufacturer {
       
        bytes mid;
        bytes32 mname;
        bytes32 mloc;
        bytes32 mproduct;
        uint mcontact;
        uint mexprice;
    }

    struct distributor {
       
        bytes did;
        bytes32 dname;
        bytes32 dproduct;
        uint dcontact;
        bytes32 origin; // 发货地
        bytes32 destination;    //目的地
    }

    // 相似
    struct retailer {
       
        bytes rid;
        bytes32 rname;
        bytes32 rloc;
        bytes32 rproduct;
        uint rcontact;
        uint rexprice;
    }

    // certificate详情，证明一批货物的质量
    struct lot {

        bytes lotno;    // LoT Number，追踪货物的
        bytes grade;
        uint mrp;
        bytes32 testdate;
        bytes32 expdate;
    }

    mapping (bytes => supplier) s1; //根据supplier ID 匹配到 supplier instance
    supplier[] public sp;           //装supplier instance的队列

    mapping (bytes => manufacturer) m1;
    manufacturer[] public mf;

    mapping (bytes => distributor) d1;
    distributor[] public db;

    mapping (bytes => retailer) r1;
    retailer[] public rt;

    mapping (bytes => lot) l1;  // certificate
    lot[] public l;

    //记录supplier的资料
    function mat(bytes memory sid, bytes32 sname, bytes32 sloc, bytes32 material, uint scon, uint spr) public {
                   
        SupplyChain.supplier memory snew = supplier(sid, sname, sloc, material, scon, spr);
        s1[sid] = snew;
        sp.push(snew);
        s++;
    }

    //记录manufacturer的资料
    function pro(bytes memory mid, bytes32 mname, bytes32 mloc, bytes32 mpro, uint mcon, uint mpr) public {
        
        SupplyChain.manufacturer memory mnew = manufacturer(mid, mname, mloc, mpro, mcon, mpr);
        m1[mid] = mnew;
        mf.push(mnew);
        m++;
    }

    //记录distributor的资料
    function ship_info(bytes memory did, bytes32 dname, bytes32 dpro, uint dcon, bytes32 org, bytes32 dst) public {
        
        SupplyChain.distributor memory dnew = distributor(did, dname, dpro, dcon, org, dst);
        d1[did] = dnew;
        db.push(dnew);
        ++d;
    }

    //记录retailer的资料
    function goods(bytes memory rid, bytes32 rname, bytes32 rloc, bytes32 rpro, uint rcon, uint rpr) public {
       
        SupplyChain.retailer memory rnew = retailer(rid, rname, rloc, rpro, rcon, rpr);
        r1[rid] = rnew;
        rt.push(rnew);
        r++;
    }


    //获取supplier的资料
    function getmat(bytes memory i) public view returns(bytes memory,bytes32,bytes32,bytes32,uint,uint) {
        return (s1[i].sid, s1[i].sname, s1[i].sloc, s1[i].material, s1[i].scontact, s1[i].sexprice);
    }

    //获取manufacturer的资料
    function getpro(bytes memory i) public view returns(bytes memory,bytes32,bytes32,bytes32,uint,uint) {
        return (m1[i].mid, m1[i].mname, m1[i].mloc, m1[i].mproduct, m1[i].mcontact, m1[i].mexprice);
    }

    //获取distributor的资料
    function getshipinfo(bytes memory i) public view returns(bytes memory,bytes32,bytes32,uint,bytes32,bytes32) {
        return (d1[i].did, d1[i].dname, d1[i].dproduct, d1[i].dcontact, d1[i].origin, d1[i].destination);
    }

    //获取retailer的资料
    function getgoods(bytes memory i) public view returns(bytes memory,bytes32,bytes32,bytes32,uint,uint) {
        return (r1[i].rid, r1[i].rname, r1[i].rloc, r1[i].rproduct, r1[i].rcontact, r1[i].rexprice);
    }

    //记录certificate的详情
    function quality(bytes memory ll, bytes memory g, uint p, bytes32 tt, bytes32 e) public{
        SupplyChain.lot memory lnew=lot(ll,g,p,tt,e);
        l1[ll]=lnew;
        l.push(lnew);
        t++;
    }

    //获取certificate的详情
    function getcert(bytes memory k) public view returns(bytes memory,bytes memory,uint,bytes32,bytes32) {
        return(l1[k].lotno, l1[k].grade, l1[k].mrp, l1[k].testdate, l1[k].expdate);
    }
}
